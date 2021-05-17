const router = require("express").Router();
const Workout = require("../models/workouts");

router.post("/api/workouts", async ({ body }, res) => {
  try {
    console.log(body);
    var result = await Workout.create(body);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/api/workouts/:id", async ({ body, params }, res) => {
  try {
    var result = await Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/api/workouts", async (req, res) => {
  try {
    var result = await Workout.find({});
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/api/workouts/range", async (req, res) => {
  try {
    var result = await Workout.find({}).limit(10);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/api/workouts", async ({ body }, res) => {
  try {
    var result = await Workout.findByIdAndRemove(body.id);
    res.json(true);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
