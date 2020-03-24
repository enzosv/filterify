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
    "data": '{"name":"' + name + '","description":"https://enzosv.github.io/filterify","public":false}'
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

function addSongsToPlaylist(token, playlistID, tracks) {
  var uris = []
  var copy = clone(tracks)
  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i]
    copy.shift()
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
      if (copy.length > 0) {
        addSongsToPlaylist(token, playlistID, copy)
      }
    });
}