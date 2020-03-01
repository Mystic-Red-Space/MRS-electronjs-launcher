const { install, getVersionList, Version} = require("@xmcl/installer/cjs/minecraft");

async function testinstall() {
    const minecraft="./minecraft";
    const list = await getVersionList();
    const aVersion = list[0];
    await install("client", aVersion, minecraft)
};
testinstall()