import User from "../model/userShcema.js";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

export const forgetPass = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "amitkumarmmdu@gmail.com",
                pass: "nncvthhogcyniuey"
            }
        });

        // Email configuration
        const mailOptions = {
            from: 'amitkumarmmdu@gmail.com',
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset your password</h1>
            <p>Click on the following link to reset your password</p>
            <a href="http://localhost:5173/reset-password/${token}</a>
            <p>The link will expire in 1 day.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: err.message });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: "Email sent successfully" });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// reset password
export const ResetPass=async(req,res)=>{
    try {
        // verify the token sent by user
       
        const decodeToken=jwt.verify(
            req.params.token,
            process.env.JWT_SECRET_KEY
        )
        // if token is invaild return error
        if(!decodeToken){
            return res.status(401).json({message:"token invaild"})
        }

        const user=await User.findOne({_id:decodeToken.userId})
        if(!user){
            return res.status(401).json({message:"no user found"})
        }

        req.body.newPassword = await bcrypt.hash(req.body.newPassword, 12);
        // update user's password .clear token and expiration time
        user.password=req.body.newPassword
        await user.save()

        res.status(200).json({message:"pasword updated"})

    } catch (error) {
       console.log(err);
    }
}