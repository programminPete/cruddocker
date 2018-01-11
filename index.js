var toWatchList = {
  movies: [],
  addMovie: function(movieTitle){
    console.log('here: ', movieTitle);
    this.movies.push({
      movieTitle: movieTitle,
      completed: false,
      review: 'not yet watched'
    });
  }
  // changeMovie: function(position, movieTitle){
  //   this.movies[position].text = movieTitle
  // },
  // toggleComplete: function(position){
  //   movies.splice
  // }
}

var handlers = {
  addMovie: () => {
    let movieTitle = document.getElementById('movie');
    console.log(' handler addMovie title: ', movieTitle.value)
    let movieToAdd = {
      movieTitle: movieTitle.value,
      completed: false,
      review: 'not yet watched'
    }
    fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieToAdd)
    }).then( (res) => {
    console.log('this is post res: ', res)
    }).catch( (err) => {
      console.log('this is an err: ', err)
    })

    view.displayMovies();
  },
  editMovie: (e) => {
    console.log(e.target.parentElement.id)
  },
  deleteMovie: (e) => {
    let currentId = e.target.parentElement.id;
    console.log('currentId: ', currentId)
    fetch('http://localhost:3000/api',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: currentId})
    })
    .then( (res) => {
      console.log('in delete res: ', res)
    })
    .catch( (err) => {
      console.log(err);
    })
    // load latest from db
    view.displayMovies();
  }
}

var view = {
  displayMovies: () => {
    console.log('in view displayMovies')
    
    fetch('http://localhost:3000/api').then(function(res){
      return res.json();
    }).then( (myBlob) => {
      console.log(myBlob.movieList.length)
      toWatchList.movies = myBlob.movieList;
      let moviesUl = document.getElementById("movie-list");
      moviesUl.innerHTML = '';

      for(let i = 0; i < toWatchList.movies.length; i++){
        let movieLi = document.createElement('li');
        movieLi.className = "list-items";
        currMovie = toWatchList.movies[i];
        movieLi.id = currMovie._id;
        let completedText = ' ';

        if (currMovie.completed === true){
          movieWithStatus = '(X)' + currMovie.movieTitle + ', ' + currMovie.review;
        }
        else{
          movieWithStatus = '( )' + currMovie.movieTitle + ', ' + currMovie.review;
        }
        // movieLi.id = i
        movieLi.textContent = movieWithStatus;
        // create edit button
        movieLi.appendChild(view.createEditButton());      
        movieLi.appendChild(view.createDeleteButton());
        moviesUl.appendChild(movieLi)
      }
    })
  },
  createEditButton: (id) => {
    let editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.className = 'editButton';
    editButton.addEventListener('click', handlers.editMovie)
    return editButton
  },
  createDeleteButton: (id) => {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', handlers.deleteMovie)
    return deleteButton
  },
  setUpEventListeners: () => {
    let addTodo = document.getElementById('add-todo').addEventListener('click', (e) => {
      console.log('clicked');
      handlers.addMovie();
    })
    }
  }

view.displayMovies();
view.setUpEventListeners();