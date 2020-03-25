const TOKEN = processToken()

function processToken() {
  var urlParams = new URLSearchParams(window.location.hash)
  history.pushState("", document.title, window.location.pathname +
    window.location.search)
  var access_token = urlParams.get('#access_token')
  if (access_token != null) {
    localStorage.setItem('access_token', access_token)
  }
  return access_token || localStorage.getItem('access_token')
}

function handleUnauthorized(xhr, status, error) {
  if (xhr.status === 401) {
    window.location.href = window.location.href.replace("/app", "")
  }
}