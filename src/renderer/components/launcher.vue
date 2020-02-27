<template>
    <div class="wrapper">
        <div class="bundle">
            <div class="header">
            </div>
            <div class="footer">
                <div class="footer-box"></div>
                <button id="btnPlay" type="button">
                    <img id="imgPlay" src="src/img/play_button_disenable.png">
                </button>
            </div>
            <div class="section"></div>
        </div>
        <div class="sidenav">
            <div id="profileCircle"></div>
            <p id="userName"></p>
            <button id="btnLogout" type="button">
                <font-awesome-icon icon="sign-out-alt"/>
                로그아웃
            </button>
        </div>
    </div>
</template>

<script>
    const storage = require('../../js/storage');
    const auth = require('../../js/auth');
    export default {
        name: "launcher",
        methods: {
            loadpage: function () {
                document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}?overlay")`;
                document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
            }
        },
        Mount() {
            this.loadpage();
        }
    }
</script>

<style scoped>
    @import "../../css/mainstyle.css";
</style>