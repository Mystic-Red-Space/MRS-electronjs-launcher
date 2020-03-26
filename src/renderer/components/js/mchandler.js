const axios = require('axios').default;
const jml = require('minecraft-jml');
const { spawn } = require('child_process');

async function installmodpack(modpack, token, uuid, username, mem) {
    const launcher = new jml.jml();
    launcher.downloadEventHandler = function (kind, name, max, current) { // log progress
        // kind : forge, library, resource, index, minecraft, mod
        console.log(`${kind} - ${name} (${current} / ${max})`);
    };
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
        modslist.push(launcher.getCustomForgeMod(element.name, element.url, element.sha1))
    });

    await launcher.initialize(gamedir);
    let versionname = launcher.getVersionName(version, forgever);
    await launcher.updateProfiles();
    if (!launcher.profiles.some(x => x.name === versionname)) {
        console.log("install forge : " + versionname);

        await launcher.downloadForge(version, forgever);
        await launcher.updateProfiles();
    }
    await launcher.downloadMods(modslist);
    const arg = await launcher.launch(versionname, {
        xmx: mem,
        server_ip: "mysticrs.tk",
        session: {
            username: username,
            access_token: token,
            uuid: uuid
        }
    });
    console.log(arg);
    const inst = spawn("java", arg, { cwd: gamedir });
    inst.stdout.on('data', function (data) {
        console.log(data + "");
    });
    inst.stderr.on('data', function (data) {
        console.log(data + "");
    });

}

async function test(id, pass) {
    let cred = await require("./auth.js").login(id, pass);
    await installmodpack("Minimalism", cred.data.accessToken, cred.data.uuid, cred.data.username, 8192)
}

//test("asdf", "asdf");

export default {
    installmodpack
};