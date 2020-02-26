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
                    <i class="far fa-eye"></i>
                </div>
                <input id="loginsave" name="saveinfo" type="checkbox" value="로그인 정보 저장"/>
                <label for="loginsave" id="savelabel">Save Login</label>
            </div>
            <div id="footer-box">
                <button id="btnLogin" type="button">
                    <img alt="" id="imgLogin" src="src/img/login_button_disenable.png"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
    @import "../../css/loginstyle.css";
</style>