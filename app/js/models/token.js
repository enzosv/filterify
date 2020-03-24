saveToken()
const TOKEN = readCookie("access_token")

function saveToken(){
    var urlParams = new URLSearchParams(window.location.hash)
    history.pushState("", document.title, window.location.pathname +
    window.location.search)
    var access_token = urlParams.get('#access_token')
    if(access_token == null) {
        return
    }
    createCookie("access_token", urlParams.get('#access_token'), urlParams.get('expires_in'))
}

function createCookie(name, value, expiration_ms) {
  if (expiration_ms) {
    var date = new Date();
    date.setTime(date.getTime() + expiration_ms);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function handleUnauthorized(xhr, status, error) {
  if (xhr.status === 401) {
      window.location.href = window.location.origin
  }
}