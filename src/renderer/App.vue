<template>
    <div id="app" >
        <div v-if="showheader" class="draggable-header">
            <img src="static/img/logo.png">
            <span>MRS Launcher</span>
            <button id="btnMiniSize" v-on:click="winmini">
                <font-awesome-icon color="whitesmoke" icon="window-minimize"/>
            </button>
            <button id="btnFullSize" v-on:click="winmax">
                <font-awesome-icon color="whitesmoke" :icon="windowstat"/>
            </button>
            <button id="btnExit" v-on:click="winclose">
                <font-awesome-icon color="whitesmoke" icon="times"/>
            </button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    const {remote} = require('electron');
    export default {
        name: 'mrs-electronjs-launcher',
        data() {
            return {
                windowstat: "window-maximize",
                showheader: process.platform !== 'darwin'
            }
        },
        methods: {
            winmax: function (event) {
                const browserWindow = remote.getCurrentWindow();
                if (browserWindow.isMaximized()) {
                    browserWindow.unmaximize();
                } else {
                    browserWindow.maximize();
                }
            },
            winmini: function (event) {
                const window = remote.getCurrentWindow();
                if (!window.isMinimized()) {
                    window.minimize();
                }
            },
            winclose: function (event) {
                window.close()
            },
            loadheader: function (event) {
                const browserWindow = remote.getCurrentWindow();
                if (browserWindow.isMaximized()) {
                    this.windowstat="window-restore"
                } else {
                    this.windowstat="window-maximize"
                }
            }
        },
        mounted() {
            window.addEventListener('resize',this.loadheader);
            this.loadheader();
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.loadheader);
        }
    }

</script>

<style>
    /* CSS */
    @import "../css/headerstyle.css";
</style>
