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
    import { ForgeInstaller, MinecraftLoction, Installer } from "../../../node_modules/@xmcl/installer";
    import { launch, ResolvedVersion, MinecraftLocation } from "../../../node_modules/@xmcl/core";

    const minecraft: MinecraftLocation;
    const list: Installer.VersionList = await Installer.getVersionList();
    const aVersion: Installer.Version = list[0]; 
    const version: 1.12.2; // full version id, like 1.13, or your forge version like, 1.13-forge-<someForgeVersion>
    const javaPath: ; // java executable path
    const gamePath: string; // .minecraft path
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
    var play = new Vue( {
        el: "#btnPlay",
        methods: {
            play: function () {
                await Installer.install("client", aVersion, minecraft);
                const proc: Promise<ChildProcess> = Launcher.launch({ gamePath, javaPath, version, extraExecOption: { detached: true } });
            }
        }
    })
</script>

<style scoped>
    @import "../../css/mainstyle.css";
</style>