const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const transporter = require("../config/mail");
// const nodemailer = require("nodemailer");
const router = express.Router();


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// ==========================
// SIGNUP API
// ==========================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==========================
// LOGIN API
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==========================
// CREATE ADMIN API
// ==========================
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Create Admin Error:", error);

    res.status(500).json({
      message: "Failed to create admin",
      error: error.message,
    });
  }
});

// ==========================
// RESET ADMIN PASSWORD API
// ==========================
router.put("/reset-admin-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
      });
    }

    const admin = await User.findOne({
      email,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      message: "Admin password reset successfully",
    });
  } catch (error) {
    console.error("Reset Admin Password Error:", error);

    res.status(500).json({
      message: "Failed to reset admin password",
      error: error.message,
    });
  }
});

// ==========================
// FORGOT PASSWORD API
// ==========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP valid for 10 minutes
    const otpExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;

    await user.save();

   const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "FoodieHub Password Reset OTP",
  text: `Your FoodieHub password reset OTP is ${otp}. This OTP is valid for 10 minutes.`,
};

await transporter.sendMail(mailOptions);

console.log("Password Reset OTP sent to:", email);

res.status(200).json({
  message: "OTP sent successfully to your email",
});

  } catch (error) {
    console.error("Forgot Password Error:", error);

    res.status(500).json({
      message: "Failed to generate OTP",
      error: error.message,
    });
  }
});

// ==========================
// VERIFY OTP API
// ==========================
router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (
      !user.resetOTPExpiry ||
      user.resetOTPExpiry < new Date()
    ) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    res.status(200).json({
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);

    res.status(500).json({
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
});


// ==========================
// RESET PASSWORD API
// ==========================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (
      !user.resetOTPExpiry ||
      user.resetOTPExpiry < new Date()
    ) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    // Clear OTP after successful reset
    user.resetOTP = null;
    user.resetOTPExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    res.status(500).json({
      message: "Failed to reset password",
      error: error.message,
    });
  }
});

// ==========================
// GET ALL CUSTOMERS API
// ==========================
router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({
          userId: customer._id,
        });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
          (sum, order) => sum + Number(order.total || 0),
          0
        );

        return {
          ...customer.toObject(),
          totalOrders,
          totalSpent,
        };
      })
    );

    res.status(200).json({
      message: "Customers fetched successfully",
      customers: customersWithOrders,
    });
  } catch (error) {
    console.error("Fetch Customers Error:", error);

    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }

  
});



module.exports = router;