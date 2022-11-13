export const RepoActionType = {
    setStatus: 'setStatus',
    setFolderError: 'setFolderError',
    setFolderWarning: 'setFolderWarning',
    setOriginError: 'setOriginError',
    setOriginWarning: 'setOriginWarning',
    setCommonError: 'setCommonError',
};

export function repoReducer (state, action) {
    switch(action.type) {
        case RepoActionType.setStatus:
            return Object.assign({}, state, {status: action.value});
        case RepoActionType.setFolderError:
            return Object.assign({}, state, {folderError: action.value});
        case RepoActionType.setFolderWarning:
            return Object.assign({}, state, {folderWarning: action.value});
        case RepoActionType.setOriginError:
            return Object.assign({}, state, {originError: action.value});
        case RepoActionType.setOriginWarning:
            return Object.assign({}, state, {originWarning: action.value});
        case RepoActionType.setCommonError:
            return Object.assign({}, state, {commonError: action.value});
        default:
            throw new Error();
    }
}

let repoDispatchers = new Map();

export function getRepoDispathers () {
    return repoDispatchers;
}

export function getRepoDispather (repo) {
    return repoDispatchers.get(repo.name);
}

export function setRepoDispatcher (key, dispatch) {
    if (!!repoDispatchers.get(key))
        return;
    repoDispatchers.set(key, dispatch);
}

