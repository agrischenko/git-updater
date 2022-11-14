import {Status} from "./status";

let repoDispatchers = new Map();
let repoItems = new Map();

export function reducer (state, action) {
    return Object.assign({}, state, action.state);
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

function getRepo (name) {
    return repoItems.get(name) || {};
}

export function updateRepo (name, state) {
    const newState = Object.assign({}, getRepo(name), state);
    repoItems.set(name, newState);
    return newState;
}

export function setStatus (state, status) {
    getDispather(state)({state: updateRepo(state.name, {status})});
}
export function setFolderWarning (state, folderWarning) {
    getDispather(state)({state: updateRepo(state.name, {folderWarning})});
}
export function setFolderError (state, folderError) {
    getDispather(state)({state: updateRepo(state.name, {folderError})});
}
export function setOriginWarning (state, originWarning) {
    getDispather(state)({state: updateRepo(state.name, {originWarning})});
}
export function setOriginError (state, originError) {
    getDispather(state)({state: updateRepo(state.name, {originError})});
}
export function setCommonError (state, commonError) {
    getDispather(state)({state: updateRepo(state.name, {commonError})});
}
export function setSyncEnabled (state, syncEnabled) {
    getDispather(state)({state: updateRepo(state.name, {syncEnabled})});
}
export function isSyncEnabled (state) {
    return !!getRepo(state.name).syncEnabled;
}
