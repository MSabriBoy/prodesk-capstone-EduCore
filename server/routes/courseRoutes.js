const express = require("express");

const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");


// CREATE + READ
router.route("/")
    .post(protectRoute, createCourse)
    .get(protectRoute, getCourses);

// UPDATE + DELETE
router.route("/:id")
    .put(protectRoute, updateCourse)
    .delete(protectRoute, deleteCourse);


module.exports = router;