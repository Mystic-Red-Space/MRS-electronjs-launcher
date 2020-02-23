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
}

module.exports = {
    loadheader
};
