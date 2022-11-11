window.__GitMock = (function () {
    function isGitFolder (path) {
        return 'ok';
    }

    function getOriginUrl (path) {
        return 'git@bitbucket.org:whatfix/whatfix-jenkins.git';
    }

    async function clone (gitUrl, destPath) {
        return 'ok';
    }

    const ERROR_GIT = '.git';

    function extractError (value) {
        return value;
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
