const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

// Secret key for JWT
const secretKey = "your-secret-key";

// Mock database of users
const users = [
  { id: 1, email: "user@example.com", password: "userpassword" },
  // ... other users
];

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  // Find user by email in the database
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Generate a JWT token for password reset (expires in 1 hour)
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  // Send the reset link to the user's email
  const resetLink = `http://localhost:${port}/reset-password?token=${token}`;
  const mailOptions = {
    from: "your-email@gmail.com",
    to: user.email,
    subject: "Password Reset",
    html: `Click <a href="${resetLink}">here</a> to reset your password.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent: " + info.response);
    res.send("Password reset email sent");
  });
});

app.get("/reset-password", (req, res) => {
  const token = req.query.token;

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    }

    // Render the password reset form
    res.render("reset-password", { token });
  });
});

app.post("/reset-password", (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.newPassword;

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    }

    // Update user's password in the database
    const user = users.find((user) => user.id === decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.password = newPassword;

    res.send("Password reset successful");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
