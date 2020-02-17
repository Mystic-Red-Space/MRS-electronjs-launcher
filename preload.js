// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const mclogin = require("./auth.js");
window.onload = function () {
    function login() {
        mclogin.login(document.getElementById("idbox").value, document.getElementById("passbox").value).then((res) => {
            console.log(JSON.stringify(res.data))
        });
        document.getElementById("btnLogin").onclick = login;
    }
};