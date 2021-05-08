const jwt = require('jsonwebtoken');


const generateJWT = ( uid, name ) => {

    const payload = { uid, name }

    return new Promise( ( resolve, reject ) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'24h'
        }, (err, token) => {
            
            if(err){
                //EVERYTHING BAD
                console.log(err);
                reject(err);

            }else{
                //EVERYTHING OK
                resolve( token );
            }

        })

    })
}

module.exports = {
    generateJWT
}