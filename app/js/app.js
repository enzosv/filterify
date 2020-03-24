var tracks = []
const filters = ["danceability", "energy", "tempo", "valence", "acousticness", "instrumentalness", "popularity"].map(function(key) {
  return new Filter(key)
})
const TRACK_FETCH_LIMIT = 50

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
  console.log("Contribute at: https://github.com/enzosv/filterify/")
  getLikedSongs(
    TOKEN,
    "https://api.spotify.com/v1/me/tracks?limit=" + TRACK_FETCH_LIMIT + "&offset=0")
})