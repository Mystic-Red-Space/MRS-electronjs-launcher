// node js

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const crypto_1 = require("crypto");
const unzipper = require("unzipper");
const lzma = require("lzma-native");
const util = require("util");

function join(...args) {
    return path.join(...args);
}

function pathjoin(args) {
    return args.join(path.delimiter);
}

function normpath(p) {
    return path.resolve(p);
}

function parent(p) {
    return path.dirname(p);
}

async function mkdir(p) {
    util.promisify(mkdirSync)(p);
}

function mkdirSync(targetDir) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = '.';

    return targetDir.split(sep).reduce(function (parentDir, childDir) {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
}

async function checkDirExists(p) {
    try {
        await util.promisify(fs.access)(p);
        return (await util.promisify(fs.lstat)(p)).isDirectory();
    } catch (error) {
        return false;
    }
}

async function checkFileExists(p) {
    try {
        await util.promisify(fs.access)(p);
        return (await util.promisify(fs.lstat)(p)).isFile();
    } catch (error) {
        return false;
    }
}

async function readdir(p) {
    return await util.promisify(fs.readdir)(p);
}

async function readdirRec(p) {
    let result = [];
    let files = await readdir(p);

    for (var i = 0; i < files.length; i++) {
        let item = join(p, files[i]);

        if (await checkFileExists(item)) {
            result.push(item);
        }
        else {
            result.push(...await readdirRec(item));
        }
    }

    return result;
}

async function copyfile(org, des) {
    await util.promisify(fs.copyFile)(org, des);
}

async function rmdir(p) {
    await util.promisify(fs.rmdir)(p, { recursive: true });
}

async function rmfile(p) {
    await util.promisify(fs.unlink)(p);
}

async function unzip(zip, target) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zip)
            .pipe(unzipper.Extract({ path: target }))
            .on("close", function () {
                resolve();
            })
            .on("error", function (err) {
                reject(err);
            });
    });
}

async function downloadlzmazipfile(url, target) {
    const res = await fetch(url);
    return new Promise((resolve, reject) => {
        const decompressor = lzma.createDecompressor();

        res.body
            .pipe(decompressor)
            .pipe(unzipper.Extract({ path: target }))
            .on("close", () => resolve())
            .on("error", (err) => reject(err));
    });
}

async function chmod(p, mode) {
    await util.promisify(fs.chmod)(p, mode);
}

async function fileread(p) {
    return await util.promisify(fs.readFile)(p, 'utf8');
}

async function filewrite(p, content) {
    await util.promisify(fs.writeFile)(p, content);
}

function getsha1(p) {
    var s = fs.createReadStream(p);
    var hash = crypto_1.createHash('sha1');
    return new Promise(function (resolve, reject) {
        s.on('data', function (_) { return hash.update(_); })
            .on('end', function () { return resolve(hash.digest('hex')); })
            .on('error', reject);
    });
}

async function get(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.text())
            .then(body => resolve(body));
    });
}

async function post(url, content) {
    return new Promise((resolve, reject) => {
        fetch(url, { method: "POST", body: content })
            .then(res => res.text())
            .then(body => resolve(body));
    });
}

async function download(url, path) {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
        });
    });
}

module.exports = {
    join: join,
    pathjoin: pathjoin,
    normpath: normpath,
    parent: parent,
    mkdir: mkdir,
    checkDirExists: checkDirExists,
    checkFileExists: checkFileExists,
    readdir: readdir,
    readdirRec: readdirRec,
    copyfile: copyfile,
    rmdir: rmdir,
    rmfile: rmfile,
    unzip: unzip,
    downloadlzmazipfile, downloadlzmazipfile,
    chmod, chmod,
    fileread: fileread,
    filewrite: filewrite,
    get: get,
    post: post,
    download: download,
    getsha1: getsha1
}