const storage = require('./js/storage');

window.onload = function () {
    document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}")`;
    document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
    document.getElementById('btnExit').onclick = function () {
        window.close();
    };
    document.getElementById('btnFullSize').onclick = function () {
        const btnFull = document.getElementById('btnFullSize');
        btnFull.classList.toggle('active');
        if(btnFull.classList.contains('active')){
            window.resizeTo(800, 600);
            self.moveBy(0,0);
        } else {
            window.resizeTo(screen.availWidth, screen.availHeight);
        }
    };
};
