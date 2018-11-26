const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
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

module.exports = mongoose.model('User', userSchema);