const Course = require("../models/Course");


// CREATE COURSE
const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            instructor: req.user.id
        });

        res.status(201).json(course);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET LOGGED-IN USER COURSES
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            instructor: req.user.id
        });

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Ownership check
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedCourse);

    } catch (error) {

    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid course id"
        });
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
}
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Ownership check
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await course.deleteOne();

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {

    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid course id"
        });
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
}
};

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};