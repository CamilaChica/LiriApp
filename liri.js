require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var  command2 = process.argv[3];

console.log("test");

switch (command){
    case "concert-this":
        infoArtist(command2);
        
        break;
    case "spotify-this-song":
        infoSong(command2);
        break;
    case "movie-this":
        infoMovie(command2);
        break;
    case "do-what-it-says":
        infoDone(command2)
        break;

}

function infoArtist(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    // handle success
    //console.log(response);
    console.log("Name of the venue: ", response.data[0].venue.name);
    console.log("Venue location: ", response.data[0].venue.city);
    console.log("Date of the Event: ", moment(response.data[0].venue.datetime).format('MM/DD/YYYY'));

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}


function infoSong(song){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (song === "") {
      song ="The Sign";
    }
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name)
    console.log("The song's name: ", data.tracks.items[0].name)
    console.log("Preview Link: ", data.tracks.items[0].preview_url)
    console.log("Album Name: ", data.tracks.items[0].album.name)
  //console.log(data); 
  });
}


function infoMovie(movie) {


// Make a request for a user with a given ID
axios.get("http://www.omdbapi.com/?apikey=8730e0e&t=" + movie)

.then(function (response) {
  if (movie === undefined) {
     movie = "Mr. Nobody";
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\nIt's on Netflix!");
  }
  else {
    // handle success
    console.log("Title of the movie: ", response.data.Title)
    console.log("Year the movie came out: ", response.data.Year)
    console.log("IMDB Rating of the movie: ", response.data.imdbRating)
    console.log("Rotten Tomatoes Rating of the movie: ", response.data.Ratings[1].Value)
    console.log("Country where the movie was produced: ", response.data.Country)
    console.log("Language of the movie: ", response.data.Language)
    console.log("Plot of the movie: ", response.data.Plot)
    console.log("Actors in the movie: ", response.data.Actors)
  }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  }); 
}

function infoDone(done){
  fs.readFile('random.txt','utf8', function(err, data) {

    data = data.split(",");
    var star = data[0];
    var star2 = data[1];

    switch (star){
      case "spotify-this-song":
          infoSong(star2);
          break;
  }
  });

}