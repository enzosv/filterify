function Track(item) {
  this.added_at = item.added_at
  this.album = item.track.album.name
  this.artists = item.track.artists.map(function(artist) {
    return artist.name
  })
  this.name = item.track.name
  this.popularity = item.track.popularity
  this.id = item.track.id
  this.uri = item.track.uri
  this.date = new Date(item.track.album.release_date)

  this.row = function() {
    function generateCell(field) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(field))
      return td
    }
    var row = document.createElement('TR')
    row.appendChild(generateCell(this.name))
    row.appendChild(generateCell(this.artists.join(", ")))
    row.appendChild(generateCell(this.album))
    return row
  }

  this.passesFilters = function(filters) {
    if (this.audio_features == null) {
      return false
    }
    for (var i = filters.length - 1; i >= 0; i--) {
      var filter = filters[i]
      var value = this.audio_features[filter.key]
      if (value < filter.min ||
        value > filter.max) {
        return false
      }
    }
    return true
  }
}

function getLikedSongs(token, url) {
  console.log("Fetching: " + url)
  var settings = ajaxSettings(token, url)

  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      var fetchedTracks = response.items.map(function(item) {
        return new Track(item)
      })
      tracks = tracks.concat(fetchedTracks)
      var ids = fetchedTracks.map(function(track) {
        return track.id
      })
      if (response.next != null) {
        getTrackFeatures(token, ids, function() {})
        getLikedSongs(token, response.next)
      } else {
        getTrackFeatures(token, ids, function() {
          filters.forEach(function(filter) {
            filter.createUI()
            filter.setupSlider(filter)
          })
          populateTable()
        })
      }
    });
}