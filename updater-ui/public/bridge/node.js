window.__NodeMock = {
    __resolveHome: function (folder) {
        return folder;
    },
    __fs_existsSync: function (folder) {
        return false;
    }
}
