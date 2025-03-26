const users = require('../model/userModel');
const companies = require('../model/companyModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// User Registration
exports.userRegisterController = async (req, res) => {
    console.log(`Inside user register controller`);
    const { name, email, password, phone, department, designation, companyId } = req.body;
    console.log(name, email, password, phone, department, designation, companyId);
    const uploadPhone = phone ? phone : "";

    try {
        const existingUsers = await users.findOne({ email });
        if (existingUsers) {
            res.status(406).json("User already exists");
        } else {
            const newUser = new users({
                name,
                email,
                password,
                phone: uploadPhone,
                department,
                designation,
                dateOfBirth: "",
                companyId
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(401).json(error);
    }
};

// User Login
exports.userLoginController = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        let existingUsers = await users.findOne({ email, password });
        if (!existingUsers) {
            existingUsers = await companies.findOne({ email, password });
        }

        if (existingUsers) {
            const token = jwt.sign({ userId: existingUsers._id }, "secretkey");
            res.status(200).json({ existingUsers, token });
        } else {
            res.status(406).json("Incorrect email or password");
        }
    } catch (error) {
        res.status(401).json(error);
    }
};

// Get All Users
exports.getAllUsersController = async (req, res) => {
    const searchKey = req.query.search || "";
    const query = {
        name: {
            $regex: searchKey,
            $options: "i"
        }
    };

    try {
        const allUsers = await users.find(query);
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(401).json(error);
    }
};

// Get Company Users
// userController.js
exports.getCompanyUsersController = async (req, res) => {
    try {
        // Validate companyId
        if (!mongoose.Types.ObjectId.isValid(req.params.companyId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid company ID format'
            });
        }

        // Find users
        const usersList = await User.find({
            companyId: req.params.companyId
        }).select('-password');

        return res.status(200).json({
            success: true,
            count: usersList.length,
            data: usersList
        });

    } catch (error) {
        console.error('Error in getCompanyUsersController:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error',
            message: error.message
        });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await users.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// get manager list
exports.getManagerListController = async (req, res) => {
    try {
        const allManagerList = await users.find({ designation: "Manager" })
        res.status(200).json(allManagerList)
    } catch (error) {
        res.status(401).json(error)
    }
}