const {MinecraftClient} = require('@eneris/minecraft-client');
const {Authentication} = require('@eneris/minecraft-client');
const {CurseForgeMod, CustomForgeMod, ForgeMod} = require('@eneris/minecraft-client');
const {InstallationProgress} = require('@eneris/minecraft-client');
const axios = require('axios').default;


async function installmodpack(modpack) {
    var version;
    var forgever;
    var serveraddress;
    var gamedir;
    rawpacklist = await axios.get('https://api.mysticrs.tk/list');
    packlist = rawpacklist.data
    packlist.forEach((element) => {
            if (element.name == modpack) {
                version = element.version
                forgever = element.forge
                serveraddress = element.server
                gamedir = require('path').resolve(modpack)
            }
        }
    )
    rawmodlist = await axios.get('https://api.mysticrs.tk/mods?name=' + modpack);
    modlist = rawpacklist.data;
    console.log(version)
    console.log(forgever)
    console.log(serveraddress)
    console.log(gamedir)
    let client = await MinecraftClient.getForgeClient(version, forgever, {
        gameDir: gamedir,
    }, InstallationProgress.callback(currentStep => {
        console.log(currentStep);
    }, progress => {
        console.log(progress);
    }))
    await client.ensureServersDat(
        {
            host: serveraddress,
            port: 25565
        }
    )
    await client.checkInstallation();
}

installmodpack("Minimalism")