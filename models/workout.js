const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//workout schema
const workout = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Enter a workout name."
    },
    type: {
        type: String,
        trim: true,
        required: "Enter a workout type."
    },
    weight: {
        type: Number,
        trim: true,
        required: "Enter a weight."
    },
    sets: {
        type: Number,
        trim: true,
        required: "Enter the number of sets."
    },
    reps: {
        type: Number,
        trim: true,
        required: "Enter the number of reps."
    },
    duration: {
        type: Number,
        trim: true,
        required: "Enter the duration of the workout."
    }
})

//create variable for schema
const workout = mongoose.model("workout", workout);

module.exports = workout;