const express = require("express");

const router = express.Router();

const protectRoute = require("../middleware/authMiddleware");

const User = require("../models/User");


router.get(
  "/dashboard",
  protectRoute,
  async (req, res) => {

    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");


      res.json({
        name: user.name,
        email: user.email,
        role: user.role
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


module.exports = router;