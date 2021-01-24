const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/workouts", (req, res) => {
  Workout.aggregate([{
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
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

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", (req, res) => {
    let isValid = true;
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
    } else if (req.body.type === "cardio") {
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
    if (isValid) {
      Workout.findByIdAndUpdate(
        req.params.id,
        {$push:{
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

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([{
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
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


module.exports = router;