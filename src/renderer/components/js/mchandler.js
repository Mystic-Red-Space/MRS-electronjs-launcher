const axios = require('axios').default;
const {ForgeInstaller, Installer} = require("@xmcl/installer");
const {Version, MinecraftFolder, ResolvedVersion, MinecraftLocation} = require("@xmcl/core");

async function installmodpack(modpack, token, uuid, username, mem) {
    let version;
    let forgever;
    let serveraddress;
    let gamedir;
    let rawpacklist = await axios.get('https://api.mysticrs.tk/list');
    let packlist = rawpacklist.data;
    packlist.forEach((element) => {
            if (element.name === modpack) {
                version = element.version;
                forgever = element.forge;
                serveraddress = element.server;
                gamedir = require('path').resolve("instances/" + modpack)
            }
        }
    );
    let rawmodlist = await axios.get('https://api.mysticrs.tk/mods?name=' + modpack);
    let modlist = rawmodlist.data;
    const list = await ForgeInstaller.getVersionList(
        {
            mcversion: version
        }
    );
    list.versions.forEach((element) => {
        if (element.version === forgever) {
            forgever = element
        }
    });
    console.log(forgever);
    await ForgeInstaller.install(forgever, gamedir);
    const parsedver = Version.parse(new MinecraftFolder(gamedir), version).catch((e) => {
        console.log(e)
    });
    Installer.installDependencies(parsedver).catch((e) => {
        console.log(e)
    })
}

installmodpack("Minimalism", "", "", "", "");