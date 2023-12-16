const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserData = require('./models/userData');


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// mongo db connection start

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// mongo db connection close

// sign up route

app.post('/signup', async (req, res) => {
    try {
        const userData = req.body;

        const { email, password } = userData
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        const { name } = savedUser
        res.status(201).json({ email, name });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// login route

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ error: 'Email not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.status(201).json(email);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// routes for crud operation on user

// Store a new user
app.post('/addUserData', async (req, res) => {
    try {
        const newUser = new UserData(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// View all users
app.get('/viewAllUsers', async (req, res) => {
    try {
        let users = await UserData.find();

        const sortOption = req.query.sort || 'default';
        console.log(sortOption);

        switch (sortOption) {
            case 'az':
                users = users.sort((a, b) => a.username.localeCompare(b.username));
                console.log(users);
                break;
            case 'za':
                users = users.sort((a, b) => b.username.localeCompare(a.username));
                break;
            case 'lastModified':
                users = users.sort((a, b) => b.updatedAt - a.updatedAt);
                break;
            case 'lastInserted':
                users = users.sort((a, b) => b.createdAt - a.createdAt);
                break;
            default:
                // No sorting or default sorting logic
                break;
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get single user

app.get('/getSingleUser', async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);
        const user = await UserData.findById(id)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit user by ID
app.patch('/editUser/:id', async (req, res) => {
    try {
        const updatedUser = await UserData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete user by ID
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        await UserData.findByIdAndDelete(req.params.id);
        res.status(200).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
