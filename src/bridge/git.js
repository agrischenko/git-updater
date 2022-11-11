window.__GitMock = (function () {
    function isGitFolder (path) {
        const cmd = `git -C ${path} rev-parse`;
        return window.__NodeMock.__executeOsCommand(cmd);
    }

    function getOriginUrl (path) {
        const cmd = `git -C ${path} config --get remote.origin.url`;
        return window.__NodeMock.__executeOsCommand(cmd).replace('\n','').trim();
    }

    async function clone (gitUrl, destPath) {
        const cmd = `git clone ${gitUrl} ${destPath}`;
        return window.__NodeMock.__executeOsCommand(cmd);
    }

    const ERROR_GIT = '.git';

    function extractError (value) {
        return value.split(':').at(-1).trim();
    }

    function isUninitializedGitFolderError (value) {
        return value === ERROR_GIT;
    }

    return {
        isGitFolder,
        clone,
        getOriginUrl,
        extractError,
        isUninitializedGitFolderError
    };
})();
