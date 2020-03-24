function generatePlaylist(name) {
  getMe(TOKEN, function(userID) {
    createPlaylist(TOKEN, userID, name, function(playlistID) {
      addSongsToPlaylist(TOKEN, playlistID, tracks)
    })
  })
}

function getMe(token, completion) {
  var settings = ajaxSettings(token, "https://api.spotify.com/v1/me")
  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      completion(response.id)
    });
}

function createPlaylist(token, userID, name, completion) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/users/" + userID + "/playlists",
    "method": "POST",
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": "Bearer " + token
    },
    "processData": false,
    "data": '{"name":"' + name + '","description":"enzo made this","public":false}'
  }

  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      completion(response.id)
    });
}

function addSongsToPlaylist(token, playlistID, tracks) {
  var songs = tracks
  var uris = []
  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i]
    songs.shift()
    if (track.passesFilters) {
      uris.push(track.uri)
      if (uris.length === 100) {
        break
      }
    }
  }
  console.log({ "uris": uris }.toString())
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks",
    "method": "POST",
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": "Bearer " + token
    },
    "processData": false,
    "data": JSON.stringify({ "uris": uris })
  }

  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      console.log(response);
      if (songs.length > 0) {
        addSongsToPlaylist(token, playlistID, songs)
      }
    });
}