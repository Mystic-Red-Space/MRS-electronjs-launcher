const http = require('https');
const uuid = require('uuid4');

function login(id,password) {
  const options = {
    hostname: "https://authserver.mojang.com",
    path: "/authenticate",
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    }
  };
  var req = http.request(options, )
}
