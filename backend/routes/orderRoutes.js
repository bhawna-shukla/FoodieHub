const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// ==========================
// CREATE ORDER API
// ==========================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      subtotal,
      delivery,
      tax,
      discount,
      total,
      paymentMethod,
    } = req.body;

    // Check required fields
    if (
      !userId ||
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all order details",
      });
    }

    // Create order
    const newOrder = new Order({
      userId,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      subtotal,
      delivery,
      tax,
      discount,
      total,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order Error:", error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

module.exports = router;