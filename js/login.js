const mclogin = require("./js/auth");
const storage = require("./storage");

window.onload = function () {
    CheckLocalStorage();

    document.querySelector('#pass-box i').onclick = function (){
        const passbox = document.getElementById('passbox');
        passbox.classList.toggle('active');
        if(passbox.classList.contains('active')){
            document.querySelector('#pass-box i')
                .setAttribute('class', 'fa fa-eye-slash');
            passbox.setAttribute('type',"text");
        }else{
            document.querySelector('#pass-box i')
                .setAttribute('class',"fa fa-eye");
            passbox.setAttribute('type','password');
        }
    };

    document.getElementById('btnLogin').onclick = function () {
        const id = document.getElementById("idbox").value;
        const passbox = document.getElementById("passbox");
        const password = passbox.value;
        if (!id || !password) {
            return;
        }
        mclogin.login(id, password).then((res) => {
            const checked = document.getElementById('loginsave').checked;
            storage.setLoginInfo(id, password, checked);
            location.href = '../main.html';
        }).catch((error) => {
            if( error.response.status === 403){
                document.getElementById('ErrorSpan').textContent = error.response.data.errorMessage;
                passbox.select();
            }
        });
    };
};