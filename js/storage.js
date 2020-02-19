function setLoginInfo(id, password, islocal = false) {
    if (islocal) {
        localStorage.setItem('id', id);
        localStorage.setItem('pwd', password);
    } else {
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('pwd', password);
    }
}

function getLoginInfo(islocal = false) {
    let info = [];
    if (islocal) {
        info[0] = localStorage.getItem('id');
        info[1] = localStorage.getItem('pwd');
    } else {
        info[0] = sessionStorage.getItem('id');
        info[1] = sessionStorage.getItem('pwd');
    }

    if (info.length === 0)
        return undefined;

    return info;
}

module.exports = {
    setLoginInfo,
    getLoginInfo
};