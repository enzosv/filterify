function generatePlaylist(name) {
  getMe(TOKEN, function(userID) {
    createPlaylist(TOKEN, userID, name, function(playlistID) {
      addSongsToPlaylist(TOKEN, playlistID, clone(tracks))
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

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function addSongsToPlaylist(token, playlistID, songs) {
  var uris = []
  for (var i = 0; i < songs.length; i++) {
    var track = songs[i]
    songs.shift()
    if (track.passesFilters(filters)) {
      uris.push(track.uri)
      if (uris.length === 100) {
        break
      }
    }
  }
  if(uris.length === 0) {
    return
  }
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
      if (songs.length > 0) {
        addSongsToPlaylist(token, playlistID, songs)
      }
    });
}