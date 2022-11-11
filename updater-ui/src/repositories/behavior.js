import DataProvider from '../DataProvider';

/**
 * Refreshes information about repository
 * resolves with true if sync is available
 * resolves with false if sync is unavailable
 * rejects on error
 */

export const BEAN = {
    FOLDER: 'FOLDER',
    ORIGIN: 'ORIGIN',
}

const STATUS = {
    FOLDER_DOES_NOT_EXIST: 'folder does not exist',
    FOLDER_IS_UNINITIALIZED: 'git folder is uninitialized',
}

export function refreshRepository (repo) {
    console.debug('refreshing: ', repo.name);
    const git = DataProvider.GitUtils;
    const node = DataProvider.Node;
    return new Promise((resolve, reject) => {
        const folderPath = node.__resolveHome(repo.folder);

        if (!node.__fs_existsSync(folderPath))
            return resolve({
                bean: BEAN.FOLDER,
                status:STATUS.FOLDER_DOES_NOT_EXIST
            });

        try {
            git.isGitFolder(folderPath);
        } catch (err) {
            const __error = git.extractError(err);
            console.log(__error)
            return git.isUninitializedGitFolderError(__error) ?
                resolve({
                    bean: BEAN.FOLDER,
                    status: STATUS.FOLDER_IS_UNINITIALIZED
                })
                : reject({
                    bean: BEAN.FOLDER,
                    status: __error
                });
        }

        let origin = '';
        try {
            origin = git.getOriginUrl(folderPath);
            if (origin !== repo.origin)
                return reject({
                    bean: BEAN.ORIGIN,
                    status: `mismatch: ${origin}`
                });
        } catch (err) {
            return reject({
                bean: BEAN.ORIGIN,
                status: err.message || err
            });
        }
    });

}