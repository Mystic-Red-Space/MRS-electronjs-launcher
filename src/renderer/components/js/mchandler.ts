import {Installer} from "@xmcl/installer";
import {MinecraftLocation} from "@xmcl/core";

async function testinstall() {
    const minecraft: MinecraftLocation = "./minecraft";
    const list: Installer.VersionList = await Installer.getVersionList();
    const aVersion: Installer.Version = list[0]; // i just pick the first version in list here
    await Installer.install("client", aVersion, minecraft);
}

testinstall();