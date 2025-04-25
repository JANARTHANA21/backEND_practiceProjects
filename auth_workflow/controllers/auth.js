require('dotenv').config();
const user=require('../models/auth')
const nodemailer = require("nodemailer");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json('Provide email, password, and name!');
    }
    try {
        const data = await user.create({ ...req.body });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json('Error creating user');
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Provide email and password!');
    }
    try {
        const find = await user.findOne({ email: email });
        if (!find) {
            return res.status(400).json('Invalid credentials');
        }
        const passcheck = await find.isPasswordCorrect(password);
        if (!passcheck) {
            return res.status(400).json('Invalid credentials');
        }

        const accessToken = await find.createaccesstoken();
        const refreshToken = await find.createrefreshtoken();
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.setHeader('refresh-token', `Bearer ${refreshToken}`);
        return res.status(200).json({ username: find.name, accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error during login');
    }
};

const resetPassword=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json('email is not provided')
    }
    try {
        const data = await user.findOne({ email });
        if (!data) {
            return res.status(400).json('Email not found');
        }
        const securityCode = Math.random().toString(36).slice(-8);
        data.resetPasswordToken = securityCode;
        data.resetPasswordExpire = Date.now() + 120 * 1000;
        await data.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: 'janarthana.life@gmail.com',
            subject: "Password Reset Code",
            text: `Your reset code is: ${securityCode}`,
        });

        return res.status(200).json('Email sent successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error sending email');
    }
    }
const resetpass=async(req,res)=>{
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json('Provide token and password');
    }
    try {
        const data = await user.findOneAndUpdate(
            { resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } },
            { 
                password:password,  // Ensure this is hashed if needed
                resetPasswordToken: null, 
                resetPasswordExpire: null 
            },
            { new: true, runValidators: true }
        );

        if (!data) {
            return res.status(400).json('Invalid or expired token');
        }

        return res.status(200).json({data,message:'Password has been updated successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error updating password');
    }
}
module.exports={login,register,resetPassword,resetpass};