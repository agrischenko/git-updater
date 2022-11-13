import DataProvider from '../DataProvider';
import {getRepoDispather, RepoActionType} from "../reducers";
import {Status} from "./status";

export function setRepositoryStatus(repo, status) {
    getRepoDispather(repo)({type: RepoActionType.setStatus, value: status});
}

export function refreshRepository(repo) {
    const dispatch = getRepoDispather(repo);
    dispatch({type: RepoActionType.setFolderError, value: ''});
    dispatch({type: RepoActionType.setOriginError, value: ''});
    dispatch({type: RepoActionType.setFolderWarning, value: ''});
    dispatch({type: RepoActionType.setOriginWarning, value: ''});
    dispatch({type: RepoActionType.setCommonError, value: ''});


    return Promise.resolve()
        .then(() => setRepositoryStatus(repo, Status.Refreshing))
        .then(() => __refreshRepository(repo))
        .then(() => setRepositoryStatus(repo, Status.Idle));
}

function __refreshRepository (repo) {
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;
    const dispatch = getRepoDispather(repo);

    console.debug(`refreshing ${repo.name}...`);
    const folderPath = node.__resolveHome(repo.folder);

    if (!node.__fs_existsSync(folderPath)) {
        return dispatch({
            type: RepoActionType.setFolderWarning,
            value: 'folder does not exist'
        });
    }

    try {
        git.isGitFolder(folderPath);
    } catch (err) {
        const __error = git.extractError(err);
        console.log(__error)
        if (git.isUninitializedGitFolderError(__error)) {
            return dispatch({
                type: RepoActionType.setFolderWarning,
                value: 'git folder is uninitialized'
            });
        } else {
            return dispatch({
                type: RepoActionType.setFolderWarning,
                value: __error
            });
        }
    }

    let origin = '';
    try {
        origin = git.getOriginUrl(folderPath);
        if (origin !== repo.origin)
            return dispatch({
                type: RepoActionType.setOriginError,
                value: `mismatch: ${origin}`
            });
    } catch (err) {
        return dispatch({
            type: RepoActionType.setOriginError,
            value: err.message || err
        });
    }
}