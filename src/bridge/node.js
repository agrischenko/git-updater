const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

window.__NodeMock = {
    __resolveHome: function (filepath) {
        if (filepath[0] === '~') {
            return path.join(process.env.HOME, filepath.slice(1));
        }
        return filepath;
    },
    __fs_existsSync: function (path) {
        return fs.existsSync(path);
    },
    __executeOsCommand: function (cmdText) {
        console.debug('__executeOsCommand: ', cmdText);
        try {
            return child_process.execSync(cmdText).toString();
        } catch (err) {
            throw err.message || err.toString();
        }
    }

}
