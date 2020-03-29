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
            <cool-select
                    :items="packlist"
                    :placeholder="packlist ? '' : '모드팩을 선택해주세요'"
                    class="selectbox"
                    disable-search
                    v-model="selected"
            >
                <template slot="item" slot-scope="{ item: pack }">
                    <div style="display: flex; align-items: center;">
                        <img :src="pack.icon" class="packicon">

                        <div>
                            <b>{{ pack.name }}</b>
                        </div>
                    </div>
                </template>
                <!-- slot for the selected item (in the text field) -->
                <template slot="selection" slot-scope="{ item: pack }">
                    <img :src="pack.icon" class="packicon">
                    <div>
                        <b>{{ pack.name }}</b>
                    </div>
                </template>
            </cool-select>
            <button id="btnLogout" type="button" v-on:click="logout">
                <font-awesome-icon icon="sign-out-alt"/>
                로그아웃
            </button>
        </div>
    </div>
</template>

<script>
    import {CoolSelect} from "vue-cool-select";

    const storage = require('./js/storage');
    const auth = require('./js/auth');
    const {installmodpack} = require('./js/mchandler').default;
    const info = storage.getLoginInfo();
    const axios = require('axios').default;
    export default {
        name: "launcher",
        data() {
            return {
                play: "static/img/play_button_disenable.png",
                selected: null,
                packlist: undefined
            }
        },
        methods: {
            loadpage: async function () {
                document.getElementById('profileCircle').style.backgroundImage = `url("https://crafatar.com/avatars/${storage.getLoginInfo().uuid}?overlay")`;
                document.getElementById('userName').innerHTML = storage.getLoginInfo().username;
                let rawpacklist = await axios.get('https://api.mysticrs.tk/list');
                this.packlist = rawpacklist.data;
            },
            logout: function () {
                auth.invalidate(info.accessToken);
                storage.removeAllStorage();
                this.$router.push('login');
            },
            launch: async function () {
                await installmodpack("Minimalism", info.accessToken, info.uuid, info.username, 4096)
            },
            getimg: function (pack) {
            }
        },
        components: {
            CoolSelect
        },
        mounted() {
            this.loadpage();
        }
    }
</script>

<style scoped>
    @import "../../css/mainstyle.css";
</style>