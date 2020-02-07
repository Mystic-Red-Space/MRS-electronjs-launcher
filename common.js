function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function loadToken() {
    try {
        return [$.cookie("name"), $.cookie("uuid"), $.cookie("access"), $.cookie("client")]
    } catch (e) {
        return [undefined, undefined, undefined, undefined]
    }
}

function resizeToMinimum() {
    var minimum = [960, 540];
    var current = [window.outerWidth, window.outerHeight];
    var restricted = [];
    var i = 2;

    while (i-- > 0) {
        restricted[i] = minimum[i] > current[i] ? minimum[i] : current[i];
    }

    window.resizeTo(restricted[0], restricted[1]);
}

window.addEventListener('resize', resizeToMinimum, false)
