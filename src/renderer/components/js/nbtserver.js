
const native = require('./native');
const nbt = require('nbt');

function parseNBT(buffer) {
    return new Promise((resolve, reject) => {
        nbt.parse(buffer, (error, data) => {
            if (error)
                reject(error);

            resolve(data);
        });
    });
}

class NBTServerDat {
    constructor(path) {
        this.path = path;
        this.servers = [];
    }

    async loadServers() {
        try {
            let filedata = await native.fileread(this.path);
            let nbtdata = await parseNBT(filedata);

            this.servers = nbtdata.value["servers"].value.value;

            if (servers === undefined)
                throw new Error('servers was undefined');
            if (!Array.isArray(this.servers))
                throw new Error('servers was not array');
        }
        catch (e) {
            console.log(e); // debug
            this.servers = [];
        }
    }

    getServer(name) {
        return this.servers.find(x => x.name.value === name);
    }

    addServer(name, ip) {
        this.servers.push(this.getServerObj(name, ip));
    }

    removeServer(name) {
        let index = this.servers.findIndex(x => x.name.value === name);
        this.servers.splice(index);
    }

    getServerObj(name, ip) {
        return {
            ip: { type: 'string', value: ip },
            name: { type: 'string', value: name }
        }
    }

    async saveServers() {
        let obj = {
            '': {
                type: 'compound',
                value: {
                    servers: {
                        type: 'list',
                        value: {
                            type: 'compound',
                            value: this.servers
                        }
                    }
                }
            }
        }

        var writer = new nbt.Writer();
        writer['compound'](obj);
        var bdata = Buffer.from(writer.getData());

        await native.filewrite(this.path, bdata);
    }
}

module.exports = {
    NBTServerDat: NBTServerDat
}
