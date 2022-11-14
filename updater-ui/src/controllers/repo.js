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

function __refreshRepository (repo) {
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;

    return new Promise((resolve, reject) => {

        console.debug(`refreshing ${repo.name}...`);
        const folderPath = node.__resolveHome(repo.folder);

        if (!node.__fs_existsSync(folderPath)) {
            Reducer.setFolderWarning(repo, 'folder does not exist');
            return resolve();
        }

        try {
            git.isGitFolder(folderPath);
        } catch (err) {
            const __error = git.extractError(err);
            console.log(__error)
            if (git.isUninitializedGitFolderError(__error)) {
                Reducer.setFolderWarning(repo, 'git folder is uninitialized');
                return resolve();
            }
            else {
                Reducer.setFolderError(repo, __error);
                Reducer.setSyncEnabled(repo, false);
                return reject();
            }
        }

        let origin = '';
        try {
            origin = git.getOriginUrl(folderPath);
            if (origin !== repo.origin) {
                Reducer.setOriginError(repo, `mismatch: ${origin}`);
                Reducer.setSyncEnabled(repo, false);
                return reject();
            }
        } catch (err) {
            Reducer.setOriginError(repo, err.message || err);
            Reducer.setSyncEnabled(repo, false);
            return reject();
        }

        resolve();
    });
}