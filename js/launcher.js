const storage = require('./js/storage');
const auth = require('./js/auth');
const { remote } = require('electron');

window.onload = function () {
    document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}")`;
    document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
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
};
