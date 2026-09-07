require("dotenv").config();

const transporter = require("./config/mail");

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "FoodieHub Nodemailer Test",
      text: "Hello! FoodieHub Nodemailer is working successfully.",
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

sendTestEmail();