const native = require("./native");
const path = require("path");
const jml = require("minecraft-jml");

//let basepath = 'C:\\programming\\git\\MRS-electronjs-launcher';
let basepath = path.resolve('./');
const modpack = 'instances';
const runtime = 'runtime';
const assets = 'assets';

function getPackPath(packname) {
    return path.join(basepath, modpack, packname);
}

function getAssetsPath() {
    return path.join(basepath, assets);
}

function getRuntimePath() {
    return path.join(basepath, runtime);
}

async function getLauncher(packname) {
    let launcher = new jml.jml();
    await launcher.initialize(getPackPath(packname));

    // share dir : /assets, /runtime

    let assets = getAssetsPath();
    launcher.mc.assets = await m(assets);
    launcher.mc.index = await m(assets + '/indexes');
    launcher.mc.assetObject = await m(assets + '/objects');
    launcher.mc.assetLegacy = await m(assets + '/virtual/legacy');

    launcher.mc.runtime = getRuntimePath();

    return launcher;
}

async function m(p) {
    p = native.normpath(p);
    await native.mkdir(p);
    return p
}

module.exports = {
    getPackPath: getPackPath,
    getLauncher: getLauncher
}