
const express = require('express');
const { UserModel } = require("../model/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require('../middleware/auth.middleware');


userRouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ msg: "user registration failed", "error": err.message });
            }
            else {
                const user = new UserModel({ name, email, password: hash, role });
                await user.save();
                const payload = {
                    user: {
                        id: user.id,
                        role: user.role
                    }
                };

                let token = jwt.sign(payload, "masai")
                res.send({ msg: "user registration successful", "token": token });

                // res.send({ msg: "user registration successful" });

            }
        });

    } catch (e) {
        res.send({ msg: "user registration failed", "error": e.message });
    }
});



userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await UserModel.find({ email })



        if (user.length > 0) {

            bcrypt.compare(password, user[0].password, (err, result) => {

                // result == true
                if (result) {
                    // const payload = {
                    //     user: {
                    //         id: user.id,
                    //         role: user.role
                    //     }
                    // };

                    // let token = jwt.sign(payload, "masai")
                    res.send({ msg: "Login Succsess" });
                    // let token = jwt.sign(payload, "masai")
                    // res.send({ msg: "Login Succsess", "token": token });
                }
                else {
                    res.send({ msg: "user registration failed" });

                }
            });

        }
        else {
            res.send({ msg: "wrong Credentials" })
        }
    } catch (e) {
        res.send({ msg: "user registration failed", "error": e.message });

    }
});

// Route for user dashboard
userRouter.get("/dashboard", authenticate("user"), async (req, res) => {
    // Get user ID from payload
    const userId = req.payload.user.id;
    // console.log(req.payload);

    // Get user data from database
    const user = await UserModel.findById(userId);

    // Return user data
    res.json(user);
});


module.exports = { userRouter }


// bala eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTEwOGZiMjViZWJjNmE1YTkzZDA3Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjc3NTk0NzY3fQ.QygxDh0Djf0JubmkdFe0S_MKi5lxPc2W - NgLHR2lwts

//admin -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTEzNTFjNWUxM2Y1MjdlNzUxMTc0Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY3NzU5NTQ3M30.G5wUyc_UViJTxszH4lGuPPiy2edo3Sd7jG5DpU4ZFBw

//admin1-- > eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTEzNTFjNWUxM2Y1MjdlNzUxMTc0Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY3NzU5NTQ3M30.G5wUyc_UViJTxszH4lGuPPiy2edo3Sd7jG5DpU4ZFBw

//aai --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTE0OGUwNzhkZjE5MzRiOTkyOTJiIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjc3NTk1NzkwfQ.8V3HNgZ01pjBZHUuMa_bgPUx3F6fzIRkH0KhalBlLns

// admin2 --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTE0YzJmOTkxYTAzMjQ5MGI2NzFmIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY3NzU5NTg0Mn0.-iyyB7MCGticB9JVL9SZ0uV3dgQENRN6ZwR6Ul0HdQU

// bbb --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTFiNGE1MDA4MTlkZmRlYTJjMDcxIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjc3NTk3NTE0fQ.Qc3FiP3CqSohaYJYLPNTAPNayd6-xy01i1fVCG1own0

// ccc --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTFkMWJhNTc2ZWY1Mzk3YmQ5MjA5Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjc3NTk3OTc5fQ.jLXrAoilc38ZzBLzednyN_2Wp659jd-5kQM_ki8u5FA


