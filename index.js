const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Check if STRIPE_KEY is loaded
console.log("Stripe Key:", process.env.STRIPE_KEY); // Add this to check if it's loaded correctly

// Initialize Stripe with your secret key
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        client_secret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({
      message: "Total must be greater than 0",
    });
  }

  console.log("Payment received:", total);
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server running on port 5000, http://localhost:5000");
});



with functions 




