<template>
    <div>
        <div id="bg"></div>
        <div class="center-box">
            <div id="head-box">
                <div id="logocircle">
                    <img alt="" src="src/img/logo.png"/>
                </div>
                <span id="ErrorSpan"></span>
            </div>
            <div id="login-box">
                <div id="id-box">
                    <input id="idbox" name="id" placeholder="e-mail" size="24" type="text"/>
                </div>
                <div id="pass-box">
                    <input id="passbox" name="password" placeholder="password" size="24" type="password"/>
                    <font-awesome-icon icon="eye" id="eye"/>
                </div>
                <input id="loginsave" name="saveinfo" type="checkbox" value="로그인 정보 저장"/>
                <label for="loginsave" id="savelabel">Save Login</label>
            </div>
            <div id="footer-box">
                <button id="btnLogin" type="button" v-on:click="BtnLogin">
                    <img alt="" id="imgLogin" src="src/img/login_button_disenable.png"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    const mclogin = require("../../js/auth");
    const storage = require("../../js/storage");
    export default {
        name: "login",
        methods: {
            BtnLogin: function (event) {
                const id = document.getElementById("idbox").value;
                const passbox = document.getElementById("passbox");
                const password = passbox.value;
                if (!id || !password) {
                    return;
                }
                mclogin.login(id, password).then((res) => {
                    const checked = document.getElementById('loginsave').checked;
                    storage.setLoginInfo(res.data.accessToken, res.data.clientToken, res.data.selectedProfile.name, res.data.selectedProfile.id, checked);
                    this.$router.push('main');
                }).catch((error) => {
                    if (error.response.status === 403) {
                        document.getElementById('ErrorSpan').textContent = error.response.data.errorMessage;
                        passbox.select();
                    }
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../css/loginstyle.css";
</style>