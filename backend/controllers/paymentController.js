import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const stripe = new Stripe(
  "sk_test_51PKGm6SBQ5236QscoOmwQ83fAupnDFbcZbVcT4davgrnrxYxnBWhUCemmAsin61fowk1qYzWmHEr78HZlAFw5Trr004VrNLKLv"
);

export const paymentController = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      description: "TEST PAYMENT",
      metadata: { integration_check: "accept_payment" },
      shipping: req.body.shipping,
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const sendStripeApi = async (req, res, next) => {
  try {
    res.status(200).json({
      stripeApiKey:
        "pk_test_51PKGm6SBQ5236Qsc4OVk0Z0I5B8O7P9a95lWhKj0zh7uTgx4RepSR0Q9J0yZjUT1kxHZ7PM9L7KPR1mIx4Tj109m00Felhmd3x",
    });
  } catch (error) {
    next(error);
  }
};
