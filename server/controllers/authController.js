const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('req.body:', req.body);

        const existingUser = await User.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User is already' });
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = await User.createUser(username, passwordHash);

        req.session.userId = newUser.id;
        res.status(201).json({ status: 'ok', item: { id: newUser.id, username: newUser.username} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.getUserByUsername(username);
        if (!user) {
            return res.status(400).json({ status: 'error', message: 'Incorrect login'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordhash);
        if (!isMatch) {
            return res.status(400).json({ status: 'error', message: 'Incorrect password'});
        }

        req.session.userId = user.id;
        return res.status(201).json({ status: 'ok', item: {id: user.id, username: user.username}});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const getCurrentUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ status: 'error', message: 'Not authorized' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
        return res.status(401).json({ status: 'error', message: 'User not find' });
    }

    return res.status(201).json({ status: 'ok', item: {id: user.id, username: user.username}});
};

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'error', message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ status: 'ok' });
    })
};

module.exports = { register, login, getCurrentUser, logout };