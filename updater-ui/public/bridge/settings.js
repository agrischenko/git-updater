window.__SettingsMock = (function () {
    let repos = [
        {
            "name": "jenkins",
            "folder": "~/tmp/repo-manager/jenkins/",
            "origin": "git@bitbucket.org:whatfix/whatfix-jenkins.git",
            "dest": "feature/pod_desktop",
            "source": "feature/development"
        },
        {
            "name": "ansible",
            "folder": "~/tmp/repo-manager/ansible/",
            "origin": "git@bitbucket.org:whatfix/whatfix-ansible-v2.git",
            "dest": "feature/pod_desktop",
            "source": "feature/development"
        },
    ];

    async function init() {
        return new Promise(resolve =>  resolve(getRepos()));
    }

    function getRepos() {
        return repos;
    }

    return {
        init,
        getRepos
    }
})();
