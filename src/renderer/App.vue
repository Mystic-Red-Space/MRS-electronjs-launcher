<template>
    <div id="app">
        <div class="draggable-header">
            <img src="../img/logo.png">
            <span>MRS Launcher</span>
            <button id="btnMiniSize" v-on:click="winmini">
                <font-awesome-icon color="whitesmoke" icon="window-minimize"/>
            </button>
            <button id="btnFullSize" v-on:click="winmax">
                <font-awesome-icon color="whitesmoke" icon="window-maximize"/>
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
        props: {},
        methods: {
            winmax: function (event) {
                const window = remote.getCurrentWindow();
                if (window.isMaximized()) {
                    window.unmaximize();
                } else {
                    window.maximize();
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
            }
        }
    }

</script>

<style>
    /* CSS */
    @import "../css/headerstyle.css";
</style>
