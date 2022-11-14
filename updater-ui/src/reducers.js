import {Status} from "./repositories/status";

export const RepoActionType = {
    setStatus: 'setStatus',
    setFolderError: 'setFolderError',
    setFolderWarning: 'setFolderWarning',
    setOriginError: 'setOriginError',
    setOriginWarning: 'setOriginWarning',
    setCommonError: 'setCommonError',
};

export function reducer (state, action) {
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

export function getDefaultState (repo) {
    return Object.assign({}, repo, {status: Status.Idle})
}

let repoDispatchers = new Map();

export function getDispather (state) {
    return repoDispatchers.get(state.name);
}

export function setDispatcher (state, dispatch) {
    const {name} = state;
    if (!!repoDispatchers.get(name))
        return;
    repoDispatchers.set(name, dispatch);
}

export function setStatus(state, status) {
    getDispather(state)({type: RepoActionType.setStatus, value: status});
}
