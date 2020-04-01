
const path = require('path');
const native = require('./native');
const commons = require("./commons");
const { spawn } = require('child_process');

async function readModCache(name) {
    let p = path.join(commons.getPackPath(name), 'modcache.dat');

    if (await native.checkFileExists(p))
        return await native.fileread(p);
    else
        return "";
}

async function writeModCache(name, content) {
    let dir = commons.getPackPath(name);
    await native.mkdir(dir);
    let p = path.join(dir, 'modcache.dat');
    await native.filewrite(p, content);
}

async function getMods(name) {
    let rawmodlist = await native.get('https://api.mysticrs.tk/mods?name=' + name);
    let modlist = JSON.parse(rawmodlist);
    let result = { files: modlist };

    if (rawmodlist != await readModCache(name)) {
        await writeModCache(name, rawmodlist);
        result["updated"] = true;
    }
    else
        result["updated"] = false


    return result;
}

async function checkHash(fpath, hash) {
    return await native.getsha1(fpath) == hash;
}

// list : [ { name, sha1, url, dir } ]
async function downloadMods(basedir, list, progress) {
    var length = list.length;
    for (let i = 0; i < length; i++) {
        let modfile = list[i];

        if (progress)
            progress('mod', modfile.name, length, i + 1);

        let moddir = path.join(basedir, modfile.dir);
        native.mkdir(moddir);
        let filepath = path.join(moddir, modfile.name);

        if (!await native.checkFileExists(filepath) || !await checkHash(filepath, modfile.sha1))
            await native.download(modfile.url, filepath);
    }
}

// list : [ { name, sha1, url, dir } ]
async function removeUserFiles(basedir, list) {
    // use HashSet to optimize

    let localfiles = await native.readdirRec(basedir);
    let serverfiles = new Set([...list.map(x => native.join(basedir, x.dir, x.name))]);
    let userfiles = localfiles.filter(x => !serverfiles.has(x))

    for (let i = 0; i < userfiles.length; i++) {
        console.log("remove " + userfiles[i]) // debug
        await native.rmfile(userfiles[i])
    }
}

// modpack : { name, forge, version, server, icon }
// progress : (kind, name, total, current)
async function startModPack(modpack, xmx, session, progress) {
    let launcher = await commons.getLauncher(modpack.name); // init mc dirs
    let gamedir = launcher.getGamePath();
    launcher.downloadEventHandler = progress;

    let jre = await launcher.checkJre(); // jre

    fireEvent(progress, '모드팩 불러오는 중')
    let mods = await getMods(modpack.name); // mods

    await downloadMods(gamedir, mods.files, progress);

    if (mods.updated) {
        fireEvent(progress, '파일 제거 중');
        await removeUserFiles(gamedir, mods.files);
    }
    return;

    fireEvent(progress, '게임 다운로드 준비 중');
    let versionname = launcher.getVersionName(modpack.version, modpack.forge);

    await launcher.updateProfiles();
    if (!launcher.profiles.some(x => x.name === versionname)) { // forge
        await launcher.checkForge(modpack.version, modpack.forge);
        await launcher.updateProfiles();
    }

    let arg = await launcher.launch(versionname, { // download game files
        xmx: xmx,
        server_ip: modpack.server,
        session: session
    });

    fireEvent(progress, '게임 설정 중');
    // set servers.dat
    // set options.txt

    fireEvent(progress, '게임 실행 완료');
    return processStart(jre, launcher.getGamePath(), arg);
}

function fireEvent(handler, msg) {
    if (handler)
        handler('launcher', msg, 1, 1);
}

function processStart(program, cwd, args) {
    let readOutput = (x => console.log(x.toString()));

    let process = spawn(program, args, { cwd: cwd });
    process.stdout.on('data', readOutput);
    process.stderr.on('data', readOutput);
    return process;
}

async function test() {
    let list = await require('./modapi').getList();
    let session = {
        access_token: 't1',
        uuid: 't2',
        username: 't3'
    }
    await startModPack(list[0], 4096, session, (k, n, m, c) => {
        console.log(`${k} ${n} ${c}/${m}`);
    });
}

test();

module.exports = {
    startModPack: startModPack
}
