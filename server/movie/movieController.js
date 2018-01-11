const Movie = require('./movieModel');
const bodyParser = require('body-parser');

const movieController = {};

// Create New Movie
movieController.createMovie = (req, res, next) => {
  console.log('create movie res: ', req.body);
  let newMovie = new Movie;
  
  newMovie.movieTitle = req.body.movieTitle;
  newMovie.completed = req.body.completed;
  newMovie.review = req.body.review;

  newMovie.save(function(err){
    if(err){
      res.send(err)
    }else{
      next();
    }
  })
}

// Get Movie List
movieController.getMovies = (req, res, next) => {
  Movie.find({}, function(err, data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      req.body.movieList = data;
      next();
    }
  });
};
// Delete Movie from list
movieController.deleteMovie = (req, res, next) => {
  console.log('in delete req body: ', req.body)
  Movie.findByIdAndRemove(req.body._id, function(err, data){
    if(err){
      res.send(err)
    }else{
      console.log('delete movies: ', data)      
      res.json({ message: 'deleted' });
    }
  });
};
// Mark movie as watched
movieController.updateMovie = (req, res, next) => {
  console.log(req.body);
  Movie.findByIdAndUpdate(req.params._id, {$set:req.body}, function(err, result){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log('RESULT: ', result);
      res.json({ message: 'done' });
    }

  })
}
// Edit review of movie

module.exports = movieController;