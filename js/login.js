const mclogin = require("./js/auth");
function login() {
    mclogin.login(document.getElementById("idbox").value, document.getElementById("passbox").value).then((res) => {
        console.log(JSON.stringify(res.data))
    });
    document.getElementById("btnLogin").onclick = login;
}