const express = require("express");

const Stripe = require("stripe");

const protectRoute = require("../middleware/authMiddleware");


const router = express.Router();


const stripe = Stripe(
    process.env.STRIPE_SECRET_KEY
);


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
                                    name: title
                                },

                                unit_amount: price * 100
                            },

                            quantity: 1
                        }

                    ],

                    mode: "payment",

                    success_url:
                        "http://localhost:5173/payment-success",

                    cancel_url:
                        "http://localhost:5173/dashboard"

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


module.exports = router;