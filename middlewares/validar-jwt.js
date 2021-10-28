const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { connection } = require('../database/db');

const validarJWT = async( req = request, res = response, next ) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1]
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        
        const { id }  = jwt.verify( token, process.env.JWT_SECRETO );
        // leer el usuario que corresponde al id
        connection.query('SELECT * FROM users WHERE id = ?', [ id ], (error, user)=>{
            if(error) {
                console.log(error)
                res.status(400).json({
                    msg: error
                })
            }
            if(user.length  === 0){
                res.json({
                    msg: 'There are not companies registed'
                })
            }else{
                 req.user = user;
                 next();
            }
        });

        // if( !usuario ) {
        //     return res.status(401).json({
        //         msg: 'Token is not valid - usuario no existe DB'
        //     })
        // }

        // // Verificar si el uid tiene estado true
        // if ( !usuario.estado ) {
        //     return res.status(401).json({
        //         msg: 'Token is not valid - usuario con estado: false'
        //     })
        // }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }

}




module.exports = { validarJWT }