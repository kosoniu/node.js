const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clickedMovies: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        }
    }]
});

userSchema.methods.addToClicked = function (movieId) {
    if(!this.clickedMovies.includes(movieId)){
        this.clickedMovies.push({
            _id: movieId
        });
    }

    return this.save();
}

userSchema.methods.resetClickedMovies = function () {
    if(this.clickedMovies.length > 0){
        this.clickedMovies = [];
    }

    return this.save();
}

module.exports = mongoose.model('User', userSchema);