const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to read user data
const readUsers = () => {
    const userData = fs.readFileSync("./data/users.json");
    const userDataParsed = JSON.parse(userData);
    return userDataParsed;
};

// function to find specific user by their email
const findUser = (email) => {
    const userData = readUsers();
    return userData.find((user) => email === user.email);
};


// get endpoint for all users
router.get('/', (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});

// get endpoint specific user
router.get('/current', (req, res) => {
    // const id = req.params.userId;
    // const foundUser = findUser(id);
    // if (!foundUser) {
    //     res.status(400).json("user not found");
    // }
    // res.status(200).json(foundUser);
    const authToken = req.headers.authorization.split(" ")[1];

    //verify token
    jwt.verify(authToken, process.env.JWT_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).send("you must be logged in to see this page");
        }
        const users = readUsers();
        const foundUser = users.find((user) => user.email === decoded.email)
        res.json(foundUser);
    });
});

// post endpoint for creating a new user
router.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required to sign up.")
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        id: uniqid(),
        email: email,
        firstName: "",
        lastName: "",
        password: hashedPassword,
        certification: "",
        yearsExperience: null,
        displayPicture: ""
    };
    
    const userData = readUsers();
    userData.push(newUser);
    console.log(userData);
    // fs.writeFileSync('./data/users.json', JSON.stringify(userData));

    res.status(201).send("registration successful!");
});

// log in auth
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required to log in.")
    }

    const foundUser = findUser(email);
    console.log(foundUser);
    if (!foundUser) {
        res.status(400).send("No user found.")
    }

    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {return res.status(400).send('Invalid password.')}
    
    const userId = foundUser.id;
    console.log(userId);

    const token = jwt.sign(
        {id: foundUser.id, email: foundUser.email},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
    )

    res.json({token: token, userId: userId});
});






// put endpoint for editing existing user
router.put('/current', (req, res) => {
    console.log("put endpoint for editing user");
});

// delete endpoint for deleting user
router.delete('/current', (req, res) => {
    console.log("delete endpoint for deleting user");
});

module.exports = router;