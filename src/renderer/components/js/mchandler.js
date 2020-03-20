const {MinecraftClient} = require('@eneris/minecraft-client');
const {Authentication} = require('@eneris/minecraft-client');
const {CurseForgeMod, CustomForgeMod, ForgeMod} = require('@eneris/minecraft-client');
const {InstallationProgress} = require('@eneris/minecraft-client');
const storage = require('./storage');
const axios = require('axios').default;


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
    let modslist = [];
    modlist.forEach((element) => {
        modslist.push(new CustomForgeMod(element.name, element.name, element.url, element.sha1))
    });
    let client = await MinecraftClient.getForgeClient(version, forgever, {
        gameDir: gamedir,
    }, InstallationProgress.callback(currentStep => {
        console.log(currentStep);
    }, progress => {
        console.log(progress);
    }));
    await client.ensureServersDat(
        {
            host: serveraddress,
            name: modpack
        }
    );
    await client.checkInstallation();
    await client.checkMods(modslist);
    await client.launch(
        {
            token: token,
            uuid: uuid,
            name: username,
            result: true,
            errorCause: null,
            errorMessage: null,
            errorType: null
        },
        {
            memory: mem
        }
    )
}

async function test(id, pass) {
    let cred = await require("./auth.js").login(id, pass);
    await installmodpack("Minimalism", cred.data.accessToken, cred.data.uuid, cred.data.username, "8G")
}

export default {
    installmodpack
};