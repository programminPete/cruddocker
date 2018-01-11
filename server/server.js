const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieController = require('./movie/movieController')
// setup
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const mongoURI = 'mongodb://student:ilovetesting@ds117316.mlab.com:17316/crud-practice';
mongoose.connect(mongoURI);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// main section
app.use(express.static(path.join(__dirname,'../')));


app.get('/api', movieController.getMovies, (req, res) => {
  res.status(200);
  res.send(req.body)
})

app.post('/api', movieController.createMovie, (req, res) => {
  res.status(200);
  res.end()
})

app.delete('/api', movieController.deleteMovie, (req, res) => {
  res.status(200);
  res.end()
})

// for normal js
// app.listen(PORT, () => console.log(`listening on port:${PORT}`));
// for docker 
app.listen((PORT, HOST), () => console.log(`running on http://${HOST}:${PORT}`));