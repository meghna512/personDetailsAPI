const Users = require('../models/user');

const validateBody = (req, res, next) => {
    if (req.body.email && req.body.password) {
        return next();
    }
    return res.status(400).json({message: 'Please enter a valid email or password'});
}

const checkUser = async (req, res, next) => { 
    const userUid = req.params.userUid;
    let user;
    try {
        user = await Users.findOne({ uid: userUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (user) {
        res.locals.user = user; 
    } else {
        return res.status(404).json({ message: "User not found" });
    }
    return next();
}
module.exports = {
    validateBody,
    checkUser
};