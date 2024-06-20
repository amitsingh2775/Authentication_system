import User from "../model/userShcema.js";  // Correct the file name
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => { // Export the function correctly
  try {
    const { name, email, password, confirmPassword } = req.body; // Correct variable name

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(200).json({ message: "Account successfully created", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Validate input fields
      if (!email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({
              message: "User does not exist",
              success: false
          });
      }

      // Validate password
      const matchPass = await bcrypt.compare(password, user.password);
      if (!matchPass) {
          return res.status(400).json({
              message: "Password doesn't match",
              success: false
          });
      }

      // Generate JWT token
      const tokenData = {
          userId: user._id
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

      // Set token in a cookie
      res.cookie('token', token, {
          httpOnly: true,   // Prevents client-side JavaScript from reading the cookie
          secure: true,     // Ensures the cookie is only sent over HTTPS
          sameSite: 'Strict' // Protects against cross-site request forgery (CSRF) attacks
      });

      // Respond with user data and token
      res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};