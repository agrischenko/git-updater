import DataProvider from '../DataProvider';
import * as Reducer from "../model/reducers";
import {Status} from "../model/status";

export function refresh(state) {
    Reducer.setFolderError(state, '');
    Reducer.setOriginError(state, '');
    Reducer.setFolderWarning(state, '');
    Reducer.setOriginWarning(state, '');
    Reducer.setCommonError(state, '');
    Reducer.setSyncEnabled(state, true);

    return Promise.resolve()
        .then(() => Reducer.setStatus(state, Status.Refreshing))
        .then(() => __refreshRepository(state))
        .catch(() => {})
        .finally(() => Reducer.setStatus(state, Status.Idle));
}

export function sync(state) {
    return Promise.resolve()
        .then(() => refresh(state))
        .then(() => Reducer.setStatus(state, Status.Syncing))
        .then(() => __syncRepository(state))
        .catch(() => {})
        .finally(() => Reducer.setStatus(state, Status.Idle));
}

function __refreshRepository (state) {
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;

    return new Promise((resolve, reject) => {

        console.debug(`refreshing ${state.name}...`);
        const folderPath = node.__resolveHome(state.folder);

        if (!node.__fs_existsSync(folderPath)) {
            Reducer.setFolderWarning(state, 'folder does not exist');
            return resolve();
        }

        try {
            git.isGitFolder(folderPath);
        } catch (err) {
            const __error = git.extractError(err);
            console.log(__error)
            if (git.isUninitializedGitFolderError(__error)) {
                Reducer.setFolderWarning(state, 'git folder is uninitialized');
                return resolve();
            }
            else {
                Reducer.setFolderError(state, __error);
                Reducer.setSyncEnabled(state, false);
                return reject();
            }
        }

        let origin = '';
        try {
            origin = git.getOriginUrl(folderPath);
            if (origin !== state.origin) {
                Reducer.setOriginError(state, `mismatch: ${origin}`);
                Reducer.setSyncEnabled(state, false);
                return reject();
            }
        } catch (err) {
            Reducer.setOriginError(state, err.message || err);
            Reducer.setSyncEnabled(state, false);
            return reject();
        }

        resolve();
    });
}

function __syncRepository (state) {
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;
    return new Promise((resolve, reject) => {

        if (!Reducer.isSyncEnabled(state))
            return resolve();

        console.debug(`syncing ${state.name}...`);

        const folderPath = node.__resolveHome(state.folder);
        const worker = node.__fs_existsSync(folderPath) ?
            git['sync'] : git['clone'];

        worker(state.origin, folderPath)
            .then(() => resolve())
            .catch(err => {
                Reducer.setCommonError(state, err);
                reject();
            });
    });
}