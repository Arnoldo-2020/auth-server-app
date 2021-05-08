const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

const createUser = async ( req, res = response ) => {

    const { name, email, password } = req.body;
    
    try {
        
        //Verify email
        const user = await User.findOne({ email: email });

        if ( user ){
            return res.status(400).json({
                ok : false,
                msg: 'The user already exists' 
            })
        }

        //Create user with the model
        dbUser = new User(req.body);

        //Hash the password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generate JWT
        const token = await generateJWT( dbUser.id, dbUser.name );

        //Create database user
        await dbUser.save();

        // Generate success response
        return res.status(201).json({
            ok : true,
            uid: dbUser.id,
            name,
            token 
        });


    } catch (error) {

        console.log(error);        
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

const loginUser = async ( req, res= response ) => {

    const { email, password } = req.body;
   
    try {
        
        const dbUser = await User.findOne({ email: email });

        if( !dbUser ){
            return res.status(400).json({
                ok : false,
                msg: 'email and password are incorrect' 
            })
        }

        //Confirm if password is matching
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok : false,
                msg: 'email and password are incorrect' 
            })
        }

        //Generate JWT
        const token = await generateJWT( dbUser.id, dbUser.name );

        // Generate success response
        return res.status(201).json({
            ok : true,
            uid: dbUser.id,
            name: dbUser.name,
            token 
        });

    } catch (error) {
        
        console.log(error);        
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });

    }

}

const validateUser = async ( req, res= response ) => {

    const { uid, name } = req;

    //Generate JWT
    const token = await generateJWT( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    });

}



module.exports = {
    createUser,
    loginUser,
    validateUser
}