const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    decision: {
        accepted: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }],
        rejected: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }]
    }
});


movieSchema.methods.addToAccepted = function(userId){
    if(!this.decision.accepted.includes(userId)){
        this.decision.accepted.push({
            _id: new mongoose.Types.ObjectId(userId)
        });
    }

    return this.save();
}

movieSchema.methods.addToRejected = function (userId) {
    if(!this.decision.rejected.includes(userId)){
        this.decision.rejected.push({
            _id: new mongoose.Types.ObjectId(userId)
        });
    }

    return this.save();
}

module.exports = mongoose.model('Movie', movieSchema);
