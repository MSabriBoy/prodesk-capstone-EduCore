const express = require("express");

const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  protectRoute,
  (req, res) => {

    res.json({
      message: "Welcome to EduCore Dashboard",
      userId: req.user.id
    });

  }
);

module.exports = router;