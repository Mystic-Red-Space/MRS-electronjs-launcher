const {loadheader} = require("./js/header");
const storage = require("./js/storage");
const mclogin = require("./js/auth");

window.onload = function () {
    EnsureValidate();
    loadheader();
};

function EnsureValidate() {
    const localStorage = storage.tryGetLocalStorage();
    if (!localStorage){
        location.href = './login.html';
        return;
    }
    mclogin.validate(localStorage.accessToken)
        .then((res) => {
            if (res.status === 204) {
                storage.clonLocaltoSession();
                location.href = './main.html';
            }
        })
        .catch((err) => {
            storage.removeLocalStorage();
        location.href = './login.html';
    });
};
