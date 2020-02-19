const axios = require('axios');

function getSkin(uuid) {
    return axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
}