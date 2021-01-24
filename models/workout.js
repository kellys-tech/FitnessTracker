const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//workout schema
const workoutSchema = new Schema({
    exercises: [{
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
        },
        sets: {
            type: Number,
            trim: true,
        },
        reps: {
            type: Number,
            trim: true,
        },
        duration: {
            type: Number,
            trim: true,
            required: "Enter the duration of the workout."
        },
        distance: {
            type: Number,
            trim: true
        }

    }],
    day: {
        type: Date,
        default: Date.now
    },
});

//create variable for schema
const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
