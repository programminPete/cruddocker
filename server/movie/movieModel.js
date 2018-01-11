var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  movieTitle: String,
  completed: Boolean,
  review: String
})

module.exports = mongoose.model('Movie', movieSchema);