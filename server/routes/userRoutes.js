const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

// function to read user data
const readUsers = () => {
    const userData = fs.readFileSync("./data/users.json");
    const userDataParsed = JSON.parse(userData);
    return userDataParsed;
};

// function to find specific user
const findUser = (id) => {
    const userData = readUsers();
    return userData.find((user) => id === user.id)
};

// function to find specific user

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
router.post('/', (req, res) => {
    // backend validation if form not fully completed
    const newUser = {
        id: uniqid(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        certification: "",
        yearsExperience: null,
        displayPicture: ""
    };
    
    const userData = readUsers();
    userData.push(newUser);
    console.log(userData);
    // fs.writeFileSync('./data/users.json', JSON.stringify(userData));

    res.status(201).json(newUser);
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