var tracks = []
const filters = [
  "danceability",
  "energy",
  "tempo",
  "valence",
  "acousticness",
  "instrumentalness",
  "popularity",
  "year"
].map(function(key) {
  return new Filter(key)
})

const sorts = [
  { "value": "added_at", "title": "Date Added" },
  // { "value": "name", "title": "Title" },
  // { "value": "artists", "title": "Artists" },
  // { "value": "album", "title": "Album" },
  { "value": "danceability", "title": "Danceability" },
  { "value": "energy", "title": "Energy" },
  { "value": "tempo", "title": "Tempo" },
  { "value": "valence", "title": "Valence" },
  { "value": "acousticness", "title": "Acousticness" },
  { "value": "instrumentalness", "title": "Instrumentalness" },
  { "value": "popularity", "title": "Popularity" },
  { "value": "year", "title": "Year" }
]
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
    if(track.passesFilters(filters)){
      newBody.appendChild(track.row())
    }
  })
  oldBody.parentNode.replaceChild(newBody, oldBody)
  document.getElementById("countLabel").innerHTML = "Song count: " + newBody.rows.length
}

function sortTracks(sender) {
  var selectedIndex = sender.selectedIndex
  var sortValue = sorts[selectedIndex].value
  tracks = tracks.sort(function(a, b) {
    return compare(a, b, sortValue)
  })
  populateTable()
}

function setupViews() {
  console.log("setting up UI")
  filters.forEach(function(filter) {
    filter.createUI()
    filter.setupSlider(filter)
  })
  sorts.forEach(function(sort) {
    $('<option value="' + sort.value + '">' + sort.title + '</option>').appendTo('#sortList')
  })
  populateTable()
}

window.addEventListener('load', function() {
  console.log("Contribute at: https://github.com/enzosv/filterify/")
  var TODO = [
    "Better login",
    "Make table body scrollable instead of page",
    "Highlight tooltip for key words",
    "Loading indicators",
    "Success indicator",
    "Error messages",
    "Think of a better name"
  ]
  console.log("TODO:\n\t" + TODO.join("\n\t"))
  getLikedSongs(
    TOKEN,
    "https://api.spotify.com/v1/me/tracks?limit=" + TRACK_FETCH_LIMIT + "&offset=0")
})