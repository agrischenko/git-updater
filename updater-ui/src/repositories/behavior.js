import DataProvider from '../DataProvider';
import * as RepoReducers from "../reducers";
import {Status} from "./status";

export function refresh(repo) {
    const dispatch = RepoReducers.getDispather(repo);
    dispatch({type: RepoReducers.RepoActionType.setFolderError, value: ''});
    dispatch({type: RepoReducers.RepoActionType.setOriginError, value: ''});
    dispatch({type: RepoReducers.RepoActionType.setFolderWarning, value: ''});
    dispatch({type: RepoReducers.RepoActionType.setOriginWarning, value: ''});
    dispatch({type: RepoReducers.RepoActionType.setCommonError, value: ''});


    return Promise.resolve()
        .then(() => RepoReducers.setStatus(repo, Status.Refreshing))
        .then(() => __refreshRepository(repo))
        .then(() => RepoReducers.setStatus(repo, Status.Idle));
}

function __refreshRepository (repo) {
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;
    const dispatch = RepoReducers.getDispather(repo);

    console.debug(`refreshing ${repo.name}...`);
    const folderPath = node.__resolveHome(repo.folder);

    if (!node.__fs_existsSync(folderPath)) {
        return dispatch({
            type: RepoReducers.RepoActionType.setFolderWarning,
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
                type: RepoReducers.RepoActionType.setFolderWarning,
                value: 'git folder is uninitialized'
            });
        } else {
            return dispatch({
                type: RepoReducers.RepoActionType.setFolderWarning,
                value: __error
            });
        }
    }

    let origin = '';
    try {
        origin = git.getOriginUrl(folderPath);
        if (origin !== repo.origin)
            return dispatch({
                type: RepoReducers.RepoActionType.setOriginError,
                value: `mismatch: ${origin}`
            });
    } catch (err) {
        return dispatch({
            type: RepoReducers.RepoActionType.setOriginError,
            value: err.message || err
        });
    }
}