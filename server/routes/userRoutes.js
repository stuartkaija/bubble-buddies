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

    const emailExists = readUsers().find(user => user.email === email)

    if (emailExists) {
        return res.status(400).send("That email is already in the system.")
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
        // default picture when new user signs up
        displayPicture: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        swipeRight: [],
        swipeLeft: [],
        about: ""
    };
    
    const userData = readUsers();
    userData.push(newUser);
    console.log(userData);
    fs.writeFileSync('./data/users.json', JSON.stringify(userData));

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
        res.status(400).send("User not found.")
    }

    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {return res.status(400).send('Invalid password.')}
    
    const userId = foundUser.id;

    const token = jwt.sign(
        {id: foundUser.id, email: foundUser.email},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
    )

    res.json({token: token, userId: userId});
});

// put endpoint for adding users from find buddy page
router.put('/swipe', (req, res) => {
    // logged in user, potential buddy, direction of swipe
    const { userId, buddy, direction } = req.body

    const users = readUsers();

    const potentialBuddy = readUsers().find(user => user.id === buddy);

    for (let i = 0; i < users.length; i++) {
        const user = readUsers().find(user => user.id === userId);
        const index = readUsers().findIndex(user => user.id === userId)

        // find correct user
        if (users[i].id === userId) {
            if (direction === 'right') {
                user.swipeRight.push(potentialBuddy.firstName);
                // splice updated user object back into users array
                users.splice(index, 1, user);
                fs.writeFileSync("./data/users.json", JSON.stringify(users));
            };
            if (direction === 'left') {
                user.swipeLeft.push(potentialBuddy.firstName);
                users.splice(index, 1, user);
                fs.writeFileSync("./data/users.json", JSON.stringify(users));
            };
        }
    }

    res.status(200).send('Swipe registered');
});

// put endpoint for editing existing user profile
router.put('/edit', (req, res) => {
    const { id, firstName, lastName, certification, yearsExperience, about } = req.body
    console.log(req.body);
    
    if (!id || !firstName || !lastName || !certification || !yearsExperience ) {
        res.status(400).send('Please fill in all fields')
    }

    const users = readUsers();

    const user = readUsers().find(user => user.id === id);

    const index = readUsers().findIndex(user => user.id === id)
    console.log(index);
   
    user.id = id

    if (firstName) {user.firstName = firstName}
    if (lastName) {user.lastName = lastName}
    if (certification) {user.certification = certification}
    if (yearsExperience) {user.yearsExperience = yearsExperience}
    if (about) {user.about = about}

    users.splice(index, 1, user);

    fs.writeFileSync("./data/users.json", JSON.stringify(users));

    res.status(200).send('Edited profile successfully')
});

// delete endpoint for deleting user
router.delete('/delete', (req, res) => {
    const { id } = req.body;

    let users = readUsers();
    
    //find index of user to delete
    const index = readUsers().findIndex(user => user.id === id)

    // remove user from data
    users.splice(index, 1);

    fs.writeFileSync("./data/users.json", JSON.stringify(users));

    console.log(users);

    res.status(200).send('Profile deleted succesfully.')
});

module.exports = router;