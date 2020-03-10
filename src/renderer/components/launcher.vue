<template>
    <div class="wrapper">
        <div class="bundle">
            <div class="header">
            </div>
            <div class="footer">
                <div class="footer-box"></div>
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
    const {MinecraftClient} = require('minecraft-client');
    const {Authentication} = require('minecraft-client')
    const {CurseForgeMod, CustomForgeMod, ForgeMod} = require('minecraft-client');
    const {InstallationProgress} = require('minecraft-client');
    const storage = require('./js/storage');
    const auth = require('./js/auth');
    export default {
        name: "launcher",
        data() {
            return {
                play: "static/img/play_button_disenable.png",
                // simple example of items
                items: ['Item 1', 'Item 2', 'Item 3'],
                // there will be a selected item
                selected: null
            }
        },
        methods: {
            loadpage: function () {
                document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}?overlay")`;
                document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
            },
            logout: function () {
                const info = storage.getLoginInfo();
                auth.invalidate(info.accessToken);
                storage.removeAllStorage();
                this.$router.push('login');
            },
            launch: async function () {
                let MinecraftClient = await MinecraftClient.getForgeClient("1.14.4", "last", {
                gameDir: '../../../minecraft'
                });
                await client.checkInstallation();
                console.log(client.checkInstallation());
                client.launch(Authentication.offline("jamfong0627"));
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