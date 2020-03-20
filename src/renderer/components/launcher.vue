<template>
    <div class="wrapper">
        <div class="bundle">
            <div class="header">
            </div>
            <div class="footer">
                <div class="footer-box">

                </div>
                <button id="btnPlay" type="button" v-on:click="launch">
                    <img :src="play" id="imgPlay">
                </button>
            </div>
            <div class="section"></div>
        </div>
        <div class="sidenav">
            <div id="profileCircle"></div>
            <p id="userName"></p>
            <button id="btnLogout" type="button" v-on:click="logout">
                <font-awesome-icon icon="sign-out-alt"/>
                로그아웃
            </button>
        </div>
    </div>
</template>

<script>
    const storage = require('./js/storage');
    const auth = require('./js/auth');
    const {installmodpack} = require('./js/mchandler').default;
    const info = storage.getLoginInfo();
    export default {
        name: "launcher",
        data() {
            return {
                play: "static/img/play_button_disenable.png"
            }
        },
        methods: {
            loadpage: function () {
                document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}?overlay")`;
                document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
            },
            logout: function () {
                auth.invalidate(info.accessToken);
                storage.removeAllStorage();
                this.$router.push('login');
            },
            launch: async function () {
                await installmodpack("Minimalism", info.accessToken, info.uuid, info.username, "4G")
            }
        },
        components: {},
        mounted() {
            this.loadpage();
        }
    }
</script>

<style scoped>
    @import "../../css/mainstyle.css";
</style>