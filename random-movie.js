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
			
			// return the movie
            Session.set('moviePath', movie)
			//return movie
    	}
    });
    
      Template.movieList.helpers({
        'movie': function() {
            return Movies.find()
        }
    });
    
    Template.addMovie.events({
        // adding title and link to movie
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
            // clearing previous inputs 
            event.target.movieTitle.value = "";
            event.target.movieUrl.value = "";
        }
    });
    
    Template.movieList.events({
        // remove movie
        'click .remove': function(event){
            Movies.remove(this._id);
        }
    })    
  
    
    
    
}
