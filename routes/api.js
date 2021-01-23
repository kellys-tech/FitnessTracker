const router = require("express").Router();
const Workout = require("../models/workout.js");

//get workout and sum of duration of exercises, sort in ascending order
router.get("/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
        }
    }])
        .sort({ day: 1 })
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/workouts/range", (req, res) => {
    Workout.find()
        .sort({ day: 1 })
        .limit(7)
        .then(workout => {
            console.log(workout);
            res.json(workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//create new workout
router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//update workout by id
router.put("/workouts/:id", (req, res) => {
    //push this req.body into the exercise array
    Workout.updateOne(
        { _id: req.params.id }, 
        { $push: { exercises: req.body } },
    );
    let isValid = true;
    // if workout type is resistance then use these fields
    if (req.body.type === "resistance") {
        if (req.body.name === "") {
            isValid = false;
        }
        if (req.body.weight === "") {
            isValid = false;
        }
        if (req.body.sets === "") {
            isValid = false;
        }
        if (req.body.reps === "") {
            isValid = false;
        }
        if (req.body.duration === "") {
            isValid = false;
        }
    }
    //otherwise if workout type is cardio, use these fields
    else if (req.body.type === "cardio") {
        if (req.body.name === "") {
            isValid = false;
        }
        if (req.body.duration === "") {
            isValid = false;
        }
        if (req.body.distance === "") {
            isValid = false;
        }
    }
    //if fields are valid then update the workout by id and push to exercises
    if (isValid) {
        Workout.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    exercises: req.body
                }
            }
        )
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
});

//get total duration of workout, sort in ascending order
router.get("/workout/range", (req, res)=> {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
        }
    }])
    .sort({ day:1 })
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;


