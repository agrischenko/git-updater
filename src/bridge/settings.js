window.__SettingsMock = (function () {
    let repos = [];

    async function init() {
        return new Promise((resolve, reject) => {
            fs.readFile('repos.json', (err, data) => {
                if (err) {
                    console.error('Error while read repos.json: ', err);
                    return reject(new Error('Error while read repos.json: '+err.message));
                }
                repos = JSON.parse(data);
                resolve(getRepos());
            });
        });
    }

    function getRepos() {
        return repos;
    }

    return {
        init,
        getRepos
    }
})();
