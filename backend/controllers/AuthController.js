const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signup = async (req, res) => {
    try {
        const { name, email, contact, password, company, agency } = req.body;
        if (!name || !email || !contact || !password || !company || !agency) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user already exist" });
        }
        const userModel = new UserModel({ name, email, contact, password, company, agency });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: "Signup Successfully", success: true });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: "internal Server Error", success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password}= req.body;
        const user = await UserModel.findOne({ email });
        const errormsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errormsg, success: false });

        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errormsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        res.status(200).json({ message: "login success", success: true, jwtToken, email, name: user.name })
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: "internal Server Error", success: false })
    }
}

const profile = async (req, res) => {
    try {
        // Get user id from JWT payload set by auth middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        // Find user by id, exclude password
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.status(200).json({ 
            success: true,
            name: user.name,
            email: user.email,
            contact: user.contact,
            company: user.company,
            agency: user.agency
        });
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

module.exports = {
    signup,
    login,
    profile

}