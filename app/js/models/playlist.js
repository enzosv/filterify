function generatePlaylist(name) {
  getMe(TOKEN, function(userID) {
    createPlaylist(TOKEN, userID, name, function(playlistID) {
      addSongsToPlaylist(TOKEN, playlistID, tracks)
    })
  })
}

function getMe(token, completion) {
  var settings = ajaxSettings(token, "https://api.spotify.com/v1/me")
  $.ajax(settings).done(function(response) {
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

  $.ajax(settings).done(function(response) {
    completion(response.id)
  });
}

function addSongsToPlaylist(token, playlistID, tracks) {
  var uris = tracks.filter(function(track) {
    return track.passesFilters(filters)
  }).map(function(track) {
    return '"' + track.uri + '"'
  })
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
    "data": '{"uris":[' + uris.join(",") + ']}'
  $.ajax(settings)
    .fail(handleUnauthorized)
    .done(function(response) {
      console.log(response);
    });
  }
}