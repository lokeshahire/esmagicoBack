
const express = require('express');
// const { UserModel } = require("../model/user");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require('../middleware/auth.middleware');
const { UserModel } = require('../model/user');

// Route to get all users and their roles
// adminRouter.get('/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Server Error' });
//     }
// });

// // Route to update user role
// adminRouter.put('/admin/user/:id', authMiddleware, adminMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         user.role = req.body.role;

//         await user.save();

//         res.send({ message: 'User role updated' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Server Error' });
//     }
// });

// // Admin middleware to check if user is an admin
// const adminMiddleware = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(401).send({ message: 'Admin access only' });
//     }

//     next();
// };



// Route for admin dashboard
adminRouter.get("/dashboard", authenticate("admin"), async (req, res) => {
    // Get all users from database

    try {
        const users = await UserModel.find({});
        // console.log(UserModel)
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error' });
    }

});

adminRouter.put('/dashboard/:id', authenticate("admin"), async (req, res) => {
    try {
        const users = await UserModel.findById(req.params.id);

        if (!users) {
            return res.status(404).send({ message: 'User not found' });
        }

        users.role = req.body.role;

        await users.save();

        res.send({ message: 'User role updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error' });
    }
});


module.exports = { adminRouter }
