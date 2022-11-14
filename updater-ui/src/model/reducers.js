import {Status} from "./status";

let repoDispatchers = new Map();
let repoItems = new Map();

function getRepo(state) {
    return repoItems.get(state.name) || {};
}

export const ActionType = {
    setStatus: 'setStatus',
    setFolderError: 'setFolderError',
    setFolderWarning: 'setFolderWarning',
    setOriginError: 'setOriginError',
    setOriginWarning: 'setOriginWarning',
    setCommonError: 'setCommonError',
    setSyncEnabled: false,
};

export function reducer (state, action) {
    switch(action.type) {
        case ActionType.setStatus:
            state = Object.assign({}, state, {status: action.value});
            break;
        case ActionType.setFolderError:
            state = Object.assign({}, state, {folderError: action.value});
            break;
        case ActionType.setFolderWarning:
            state = Object.assign({}, state, {folderWarning: action.value});
            break;
        case ActionType.setOriginError:
            state = Object.assign({}, state, {originError: action.value});
            break;
        case ActionType.setOriginWarning:
            state = Object.assign({}, state, {originWarning: action.value});
            break;
        case ActionType.setCommonError:
            state = Object.assign({}, state, {commonError: action.value});
            break;
        case ActionType.setSyncEnabled:
            state = Object.assign({}, state, {syncEnabled: action.value});
            break;
        default:
            throw new Error();
    }
    updateRepo(state);
    return state;
}

export function getDefaultState (repo) {
    return Object.assign({}, repo, {status: Status.Idle})
}

function getDispather (state) {
    return repoDispatchers.get(state.name);
}

export function createDispatcher (state, dispatch) {
    const {name} = state;
    if (!!repoDispatchers.get(name))
        return;
    repoDispatchers.set(name, dispatch);
    updateRepo(state);
}

export function updateRepo (state) {
    repoItems.set(state.name, state);
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
export function setSyncEnabled(state, value) {
    getDispather(state)({type: ActionType.setSyncEnabled, value});
}
export function isSyncEnabled(state) {
    return getRepo(state).syncEnabled === true;
}
