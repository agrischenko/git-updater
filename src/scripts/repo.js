const sync = () => {
    return new Promise(() => {
        if (isSyncing)
            return setStatusSync(false);

        setStatusSync(true);

        const folderPath = __resolveHome(repo.getFolder());
        let needClone = fs.existsSync(folderPath);

        if (needClone) {
            GitUtils.clone(repo.getOriginSrc(), folderPath)
                .then(() => {
                    setStatusSync(false);
                    refresh();
                })
                .catch(() => {
                    setStatusSync(false);
                    refresh();
                })
        }
        try {
            GitUtils.isGitFolder(folderPath);
        } catch (err) {
            if (__extractError(err) !== ERROR_GIT)
                return setStatusSync(false);
        }
    });
}
