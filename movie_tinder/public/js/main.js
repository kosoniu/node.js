const acceptButton = document.getElementById('acceptButton');
const rejectButton = document.getElementById('rejectButton');

acceptButton.addEventListener('click', () => {

    let userId = document.getElementById('userId').value;
    let movieId = document.getElementById('movieId').value;

    // console.log(movieId);

    // fetch('http://localhost:3000/accepted', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         userId: userId,
    //         movieId: movieId
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(error => console.log(error));

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
        }else{
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
        }else{
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
        
    })
    .catch(error => console.log(error));

});
