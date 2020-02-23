const storage = require('./js/storage');
const auth = require('./js/auth');
const {loadheader} = require("./js/header");

window.onload = function () {
    document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}?overlay")`;
    document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
    loadheader();
};
