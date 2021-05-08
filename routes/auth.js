const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, validateUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

//Create a new user
router.post( '/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'mail is mandatory').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
    validateFields
] , createUser);

//Login of user
router.post( '/', [
    check('email', 'mail is mandatory').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
    validateFields
] , loginUser );

//Validate and revalidate user
router.get( '/renew', validateJWT , validateUser );



module.exports = router;