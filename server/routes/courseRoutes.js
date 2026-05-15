const express = require("express");

const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const courseSchema = require("../validators/courseValidator");

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

router.route("/")
  .post(
    protectRoute,
    validate(courseSchema),
    createCourse
  )
  .get(protectRoute, getCourses);

router.route("/:id")
  .put(
    protectRoute,
    validate(courseSchema),
    updateCourse
  )
  .delete(protectRoute, deleteCourse);

module.exports = router;