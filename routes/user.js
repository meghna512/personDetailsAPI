const router = require('express').Router();
const {createUser, loginUser,updateUser,allUsersDetails, userDetails} = require('../controller/user');
const {validateBody, checkUser} = require('../middleware/user');

//login
router.post('/login', validateBody, loginUser);

//signup
router.post('/signup', createUser);

//edit details
router.patch('/:userUid', checkUser, updateUser);

//show user details
router.get('/:userUid', checkUser, userDetails);

//show all users datails
router.get('/', allUsersDetails);

module.exports = router;