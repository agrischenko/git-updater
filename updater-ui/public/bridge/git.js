window.__GitMock = (function () {
    function isGitFolder (path) {
        return 'ok';
    }

    function getOriginUrl (path) {
        return 'git@bitbucket.org:whatfix/whatfix-jenkins.git';
    }

    async function clone (gitUrl, destPath) {
        console.log('clone ', gitUrl, 'into', destPath);
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               console.log('cloned');
               resolve();
           }, 1000);
        });
    }

    async function sync (gitUrl, destPath) {
        console.log('sync', gitUrl, 'in', destPath);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('synced');
                resolve();
            }, 1000);
        });
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
        sync,
        getOriginUrl,
        extractError,
        isUninitializedGitFolderError
    };
})();
