const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');

const createUser = async (req, res) => {
    const newUser = new Users();
    newUser.uid = shortid.generate();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.dob = req.body.dob;
    newUser.address = req.body.address;

    try {
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
    }
    catch (err) {
        return res.status(500).json({ "message": err.message });
    }
    const token = jwt.sign({ email: newUser.email }, process.env.SECRET);
    return res.status(201).json({ token });

}

const loginUser = async (req, res) => {
    let user;
    let token;
    try {
        user = await Users.findOne({ email: req.body.email });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
    if (user) {
        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (passwordMatch) {
            token = jwt.sign({ email: user.email, uid: user.uid }, process.env.SECRET);

        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } else {
        return res.status(404).json({ message: 'user not found' });
    }
    return res.status(201).json({ token });
}

const updateUser = async (req, res) => {
    res.locals.user.name = req.body.name ? req.body.name : res.locals.user.name;
    res.locals.user.email = req.body.email ? req.body.email : res.locals.user.email;
    res.locals.user.dob = req.body.dob ? req.body.dob : res.locals.user.dob;
    res.locals.user.address = req.body.address ? req.body.address : res.locals.user.address;
    try {
        await res.locals.user.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ updateduser: res.locals.user });

}

const listUser = async (req, res) => {
    if (res.locals.user) {
        return res.status(200).json(res.locals.user);
    }
    userUid = req.query.userUid;
    let user;
    try {
        user = await Users.findOne({ uid: userUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(user);

}

const listAllUsers = async (req, res) => {
    if (res.locals.user) {
        return res.status(200).json(res.locals.user);
    }
    let user;
    try {
        user = await Users.find({});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(user);

}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    listUser,
    listAllUsers
}