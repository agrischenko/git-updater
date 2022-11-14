import {Status} from "./status";

let repoDispatchers = new Map();

export const ActionType = {
    setStatus: 'setStatus',
    setFolderError: 'setFolderError',
    setFolderWarning: 'setFolderWarning',
    setOriginError: 'setOriginError',
    setOriginWarning: 'setOriginWarning',
    setCommonError: 'setCommonError',
};

export function reducer (state, action) {
    switch(action.type) {
        case ActionType.setStatus:
            return Object.assign({}, state, {status: action.value});
        case ActionType.setFolderError:
            return Object.assign({}, state, {folderError: action.value});
        case ActionType.setFolderWarning:
            return Object.assign({}, state, {folderWarning: action.value});
        case ActionType.setOriginError:
            return Object.assign({}, state, {originError: action.value});
        case ActionType.setOriginWarning:
            return Object.assign({}, state, {originWarning: action.value});
        case ActionType.setCommonError:
            return Object.assign({}, state, {commonError: action.value});
        default:
            throw new Error();
    }
}

export function getDefaultState (repo) {
    return Object.assign({}, repo, {status: Status.Idle})
}

function getDispather (state) {
    return repoDispatchers.get(state.name);
}

export function setDispatcher (state, dispatch) {
    const {name} = state;
    if (!!repoDispatchers.get(name))
        return;
    repoDispatchers.set(name, dispatch);
}

export function setStatus(state, status) {
    getDispather(state)({type: ActionType.setStatus, value: status});
}
export function setFolderWarning(state, value) {
    getDispather(state)({type: ActionType.setFolderWarning, value});
}
export function setFolderError(state, value) {
    getDispather(state)({type: ActionType.setFolderError, value});
}
export function setOriginWarning(state, value) {
    getDispather(state)({type: ActionType.setOriginWarning, value});
}
export function setOriginError(state, value) {
    getDispather(state)({type: ActionType.setOriginError, value});
}
export function setCommonError(state, value) {
    getDispather(state)({type: ActionType.setCommonError, value});
}
