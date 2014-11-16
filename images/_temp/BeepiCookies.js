function getCookie(cookieName) {
    var name = cookieName + "=";
    var allCookies= document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++) {
        var currCookie = allCookies[i].trim();
        if (currCookie.indexOf(name) == 0)
            return currCookie.substring(name.length, currCookie.length);
    }

    return null;
}

function setCookie(cookieName, cookieValue, expMinutes) {
    var d = new Date();
    d.setTime(d.getTime() + (expMinutes * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}