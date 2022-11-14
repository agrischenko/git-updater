import DataProvider from '../DataProvider';
import * as RepoReducers from "../model/reducers";
import {Status} from "../model/status";

const {ActionType} = RepoReducers;

export function refresh(repo) {
    const dispatch = RepoReducers.getDispather(repo);
    dispatch({type: ActionType.setFolderError, value: ''});
    dispatch({type: ActionType.setOriginError, value: ''});
    dispatch({type: ActionType.setFolderWarning, value: ''});
    dispatch({type: ActionType.setOriginWarning, value: ''});
    dispatch({type: ActionType.setCommonError, value: ''});


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
            type: ActionType.setFolderWarning,
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
                type: ActionType.setFolderWarning,
                value: 'git folder is uninitialized'
            });
        } else {
            return dispatch({
                type: RepoReducers.ActionType.setFolderWarning,
                value: __error
            });
        }
    }

    let origin = '';
    try {
        origin = git.getOriginUrl(folderPath);
        if (origin !== repo.origin)
            return dispatch({
                type: ActionType.setOriginError,
                value: `mismatch: ${origin}`
            });
    } catch (err) {
        return dispatch({
            type: ActionType.setOriginError,
            value: err.message || err
        });
    }
}