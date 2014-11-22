Movies = new Mongo.Collection('movies');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

if(Meteor.isClient) {
    Template.randomMovie.helpers({
        'movie': function() {
			// Return the person name
            var moviePath = Session.get('moviePath');
			return moviePath;
		}
    });
    
    Template.randomMovie.events({
        'click .randomize': function(){
        	// looks for all movies and fetch them
			var movies = Movies.find().fetch();
			
			// Generate random number from 0 to total number movies 
			var randomInt = getRandomInt(0, movies.length);
			
			// Select random person
			var movie = movies[randomInt];
        
            // set session var with movie path
            Session.set('moviePath', movie.path);
            console.log(Session.get('moviePath'));
    }
    });
    
    Template.addMovie.events({
        'submit form': function(event){
            event.preventDefault();
            var movieTitle = event.target.movieTitle.value;
            console.log(movieTitle);
            var movieUrl = event.target.movieUrl.value;
            console.log(movieUrl);
            Movies.insert({
                title: movieTitle,
                path: movieUrl
            });
        }
    });
    
    Template.movieList.helpers({
        'movie': function() {
            return Movies.find()
        }
    });
    
    
    
}