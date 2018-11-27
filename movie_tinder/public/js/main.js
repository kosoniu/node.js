const acceptButton = document.getElementById('acceptButton');
const rejectButton = document.getElementById('rejectButton');

const changeMovie =  function(movie) {
    let movieTitle = document.getElementsByClassName('movie_title')[0];
    let movieRating = document.getElementsByClassName('rating')[0];
    let movieImage = document.getElementsByClassName('photo_wrapper')[0].childNodes[1];
    let movieSummary = document.getElementsByClassName('movie_summary')[0];

    document.getElementById('movieId').value = movie._id;
    movieTitle.innerHTML = movie.title;
    movieRating.innerHTML = '(' + movie.rating.toString() + " / 10)";
    movieImage.src = movie.imageUrl;
    movieSummary.innerHTML = movie.summary;
}

const noMovies = function(){
    let mainWrapper = document.getElementsByClassName('main_box_wrapper')[0];

    mainWrapper.innerHTML = '<h1 class="alert">Brak filmów! :(</h1>';
}

acceptButton.addEventListener('click', () => {

    let userId = document.getElementById('userId').value;
    let movieId = document.getElementById('movieId').value;

    fetch('http://localhost:3000/accepted', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            movieId: movieId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then( movie => {
        console.log(movie);

        if(movie.endOfList){
            console.log("KONIEC LISTY!");
            console.log(movie);
            noMovies();
        }else{
            changeMovie(movie);
        }
        
    })
    .catch(error => console.log(error));

});

rejectButton.addEventListener('click', () => {

    let userId = document.getElementById('userId').value;
    let movieId = document.getElementById('movieId').value;

    fetch('http://localhost:3000/rejected', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            movieId: movieId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then( movie => {
        console.log(movie);

        if(movie.endOfList){
            console.log("KONIEC LISTY!");
            console.log(movie);
            noMovies();
        }else{
            changeMovie(movie);
        }
        
    })
    .catch(error => console.log(error));

});
