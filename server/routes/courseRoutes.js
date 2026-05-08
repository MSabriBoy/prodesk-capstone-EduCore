const express = require("express");

const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

const {
  createCourse,
  getCourses
} = require("../controllers/courseController");


// CREATE + READ
router.route("/")
  .post(protectRoute, createCourse)
  .get(protectRoute, getCourses);


module.exports = router;