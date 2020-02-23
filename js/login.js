const mclogin = require("./js/auth");
const storage = require("./js/storage");
const {loadheader} = require("./js/header");

window.onload = function () {
    EnsureValidate();

    loadheader();

    document.getElementById('passbox').onkeyup = function (event) {
        if (event.code === "Enter") {
            BtnLogin();
        }
    };

    document.querySelector('#pass-box i').onclick = function () {
        const passbox = document.getElementById('passbox');
        passbox.classList.toggle('active');
        if (passbox.classList.contains('active')) {
            document.querySelector('#pass-box i')
                .setAttribute('class', 'fa fa-eye-slash');
            passbox.setAttribute('type', "text");
        } else {
            document.querySelector('#pass-box i')
                .setAttribute('class', "fa fa-eye");
            passbox.setAttribute('type', 'password');
        }
    };

    document.getElementById('btnLogin').onclick = BtnLogin;

    function BtnLogin() {
        const id = document.getElementById("idbox").value;
        const passbox = document.getElementById("passbox");
        const password = passbox.value;
        if (!id || !password) {
            return;
        }
        mclogin.login(id, password).then((res) => {
            const checked = document.getElementById('loginsave').checked;
            storage.setLoginInfo(res.data.accessToken, res.data.clientToken, res.data.selectedProfile.name, res.data.selectedProfile.id, checked);
            location.href = './main.html';
        }).catch((error) => {
            if (error.response.status === 403) {
                document.getElementById('ErrorSpan').textContent = error.response.data.errorMessage;
                passbox.select();
            }
        });
    }

    function EnsureValidate() {
        const localStorage = storage.tryGetLocalStorage();
        if (!localStorage)
            return;
        mclogin.validate(localStorage.accessToken)
            .then((res) => {
                if (res.status === 204) {
                    storage.clonLocaltoSession();
                    location.href = './main.html';
                }
            })
            .catch((err) => {
                storage.removeLocalStorage();
            });
    }
};
