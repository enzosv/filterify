function AudioFeature(item, track) {
  this.danceability = item.danceability
  this.energy = item.energy
  this.tempo = item.tempo
  // this.key = item.key
  this.acousticness = item.acousticness
  this.valence = item.valence
  this.instrumentalness = item.instrumentalness
  // this.loudness = item.loudness
  // this.mode = item.mode
  // this.speechiness = item.speechiness
  // this.liveness = item.liveness
  // this.duration_ms = item.duration_ms
  // this.time_signature = item.time_signature
  this.year = track.year
  this.popularity = track.popularity
}

function getTrackFeatures(token, trackIDs, completion) {
  var settings = ajaxSettings(token, "https://api.spotify.com/v1/audio-features?ids=" + trackIDs)

  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      response.audio_features.forEach(function(feature) {
        var index = tracks.findIndex(function(track) {
          return track.id === feature.id
        })
        var track = tracks[index]
        var audioFeature = new AudioFeature(feature, track)
        track.audio_features = audioFeature
        filters.forEach(function(filter) {
          var value = audioFeature[filter.key]
          if (filter.min > value) {
            filter.min = value
          }
          if (filter.max < value) {
            filter.max = value
          }

        })
      })
      completion()
    });
}