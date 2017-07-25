var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./config');
var T = new Twitter(keys);
var cmd = process.argv[2];
var option1 = process.argv[3];
var nodeArgs = process.argv;
var movieName = "";

if (cmd === "my-tweets") {
getTweets();

} else if (cmd === "spotify-this-song") {
	if (option1) {
        getSpotify(option1); 
    } else {
        getSpotify("Ace of Base"); 
    }

} else if (cmd === "movie-this") {
	if(option1) {
		var nodeArgs = process.argv.slice(2).join(' '); 
		movieName = option1;
		getMovie(); 
	} else {
		movieName = "Mr.Nobody";
		getMovie();
	} 
}; 

//Twitter functionality
function getTweets() {
	var params = {
		screen_name: "NatlParkService",
		trim_user: true,
		count: 20
	};

console.dir(cmd);
T.get('statuses/user_timeline', params, function(error, tweets, response) {		
	if (!error && response.statusCode === 200) 
		tweets.forEach(function(t) {
			console.log(t.text);
			console.log('--------------');
		});
	});

} 

//Spotify functionality
function getSpotify(input) {
	var spotify = new Spotify({
		id: '2d91b2d12fb84821b02b52b2d3808eb3',
		secret: '4a4b0377da394c6195e5ee4456f3a4dc',
	});

if (input) {
	spotify.search ({ 
		type: 'track',
		query: input
	}, function(err, data) {
			if (err) {
			return console.log('Error occurred: ' + err);
			}
			
			console.dir("Artist: " + data.tracks.items[0].album.artists[0].name); 
			console.log('--------------');
			console.dir("Song: " + data.tracks.items[0].name);
			console.log('--------------');
			console.dir("Preview:: " + data.tracks.items[0].preview_url);
			console.log('--------------');
			console.dir("Album:: " + data.tracks.items[0].album.name);
			console.log('--------------');

		}); 

} else {
	spotify.search({
		type: 'track',
		query: input	
	}, function(err, data) {
		if (err) {
            return console.log("not found " + err);
        }
            console.dir("Artist: " + data.tracks.items[0].album.artists[0].name); 
            console.log('--------------');
			console.dir("Song: " + data.tracks.items[0].name);
			console.log('--------------');
			console.dir("Preview: " + data.tracks.items[0].preview_url);
			console.log('--------------');
			console.dir("Album: " + data.tracks.items[0].album.name);
			console.log('--------------');

		});
	} 
} 

//Movie functionality
function getMovie() {

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=40e9cece";
console.dir(queryUrl);
request(queryUrl, function(error, response, body) {

 if (!error && response.statusCode === 200) {

 	var omdb = JSON.parse(body, null, 2);

 	console.dir("Title: " + omdb.Title);
 	console.dir("Year: " + omdb.Year);
 	console.dir("imdbRating: " + omdb.imdbRating);
 	console.dir("Rotten Tomatoes Rating: " + omdb.Ratings[1].Value);
 	console.dir("Language: " + omdb.Language);
 	console.dir("Plot: " + omdb.Plot);
 	console.dir("Actors: " + omdb.Actors);
 		}	
	});
} 
