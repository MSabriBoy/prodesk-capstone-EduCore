const express = require("express");

const Stripe = require("stripe");

const protectRoute = require("../middleware/authMiddleware");


const router = express.Router();


const stripe = Stripe(
    process.env.STRIPE_SECRET_KEY
);

const CLIENT_URL =
    process.env.CLIENT_URL ||
    "http://localhost:5173";

router.post(
    "/create-checkout-session",
    protectRoute,

    async (req, res) => {

        try {

            const { title, price } = req.body;

            const session =

                await stripe.checkout.sessions.create({

                    payment_method_types: ["card"],

                    line_items: [
                        {
                            price_data: {
                                currency: "inr",

                                product_data: {
                                    name: req.body.title
                                },

                                unit_amount:
                                    req.body.price * 100
                            },

                            quantity: 1
                        }
                    ],

                    mode: "payment",

                    metadata: {
                        courseName: req.body.title,
                        coursePrice: req.body.price,
                        userId: req.user.id
                    },

                    success_url:
                        `${CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

                    cancel_url:
                        `${CLIENT_URL}/dashboard`

                });

            res.json({
                url: session.url
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);

router.get(
  "/session/:sessionId",
  protectRoute,

  async (req, res) => {

    try {

      const session =
        await stripe.checkout.sessions.retrieve(
          req.params.sessionId
        );

      res.json({
        session
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


module.exports = router;