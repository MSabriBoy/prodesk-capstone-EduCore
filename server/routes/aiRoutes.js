const express = require("express");
const protectRoute = require("../middleware/authMiddleware");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post(
  "/quiz",
  protectRoute,
  async (req, res) => {
    try {

      const { topic } = req.body;

      if (!topic) {
        return res.status(400).json({
          success: false,
          message: "Topic is required"
        });
      }

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash"
        });

      const result = await model.generateContent(
        `Generate 5 quiz questions about ${topic}. Return only plain text.`
      );

      const text =
        result.response.text();

      res.json({
        success: true,
        quiz: text
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "AI request failed"
      });
    }
  }
);

module.exports = router;