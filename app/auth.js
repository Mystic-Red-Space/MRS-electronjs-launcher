const axios = require('axios');
const uuid = require('uuid4');

function login(id,password) {
  let clientToken = uuid()
  axios.post('https://authserver.mojang.com/authenticate', {

  });
}
