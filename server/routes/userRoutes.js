const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");

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
router.get('/:userId', (req, res) => {
    const id = req.params.userId;
    const foundUser = findUser(id);
    if (!foundUser) {
        res.status(400).json("user not found");
    }
    res.status(200).json(foundUser);
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

    if (!foundUser) {
        res.status(400).send("That email doesn't seem to be registered...")
    }

    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {return res.send('wrong password :(')}

    res.send("right password :)")
    
});






// put endpoint for editing existing user
router.put('/:userId', (req, res) => {
    console.log("put endpoint for editing user");
});

// delete endpoint for deleting user
router.delete('/:userId', (req, res) => {
    console.log("delete endpoint for deleting user");
});

module.exports = router;