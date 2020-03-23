var tracks = []
const filters = ["danceability", "energy", "tempo", "valence", "acousticness", "instrumentalness"].map(function(key) {
  return new Filter(key)
})
const TRACK_FETCH_LIMIT = 50
const urlParams = new URLSearchParams(window.location.hash);
const TOKEN = urlParams.get('#access_token');
function ajaxSettings(token, url) {
  return {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": "Bearer " + token
    },
    "processData": false,
    "data": ""
  }
}

function populateTable() {
  var bodyID = 'songList'
  var oldBody = document.getElementById(bodyID)
  var newBody = document.createElement("tbody")
  newBody.setAttribute("id", bodyID)
  tracks.forEach(function(track) {
    if (track.passesFilters(filters)) {
      newBody.appendChild(track.row())
    }
  })
  oldBody.parentNode.replaceChild(newBody, oldBody)
}

window.addEventListener('load', function() {
  filters.forEach(function(filter) {
    filter.createUI()
  })
  getLikedSongs(
    TOKEN,
    "https://api.spotify.com/v1/me/tracks?limit=" + TRACK_FETCH_LIMIT + "&offset=0")
})