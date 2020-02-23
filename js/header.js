const {remote} = require('electron');

function loadheader() {
    document.getElementById('btnExit').onclick = function () {
        window.close();
    };
    document.getElementById('btnFullSize').onclick = function () {
        const window = remote.getCurrentWindow();
        window.isMaximized() ? window.unmaximize() : window.maximize();
    };
    document.getElementById('btnMiniSize').onclick = function () {
        const window = remote.getCurrentWindow();
        window.minimize();
    };
    document.getElementById('btnLogout').onclick = function () {
        const info = storage.getLoginInfo();
        auth.invalidate(info.accessToken);
        storage.removeAllStorage();
        location.href = './login.html';
    };
}

module.exports = {
    loadheader
};
