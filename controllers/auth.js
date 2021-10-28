const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { connection } = require('../database/db')
const { promisify } = require('util')

//procedimiento para registrarnos
const signup = async (req, res) => {
    const email = req.body.email
    const pass = String(req.body.pass)
    let passHash = await bcryptjs.hash(pass, 8);
    let userExist;
    try {
        if(email && pass){
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results)=>{
                userExist = results[0];
                if(userExist){
                    res.status(400).json({
                        msg: 'User already exists'
                    })
                }else{
                    connection.query('INSERT INTO users SET ?', { email, pass:passHash }, (error, results)=>{
                        if(error){console.log(error)}
                        res.json({
                            msg: 'Succesfully registed'
                        })
                    });
                }
            });
        }else {
            res.status(400).json({
                msg: 'Email and Password are required'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Something bad happened'
        });
    }
}

const login = async (req,  res) => {
    try {
        const email = req.body.email
        const pass = String(req.body.pass)

        if(!email || !pass ){
            res.status(400).json({
                msg: 'Username or Password it is wrong'
            })
        }else{
            connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results)=>{
                if( results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass)) ){
                    res.status(400).json({
                        msg: 'Username or Password its wrong'
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id;
                    const user = results[0];
                    const { email, id: user_id } = user
                    const token = jwt.sign({ id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    });
                    res.json({
                        msg: 'Successfully Logged',
                        token,
                        email,
                        user_id 
                    });
                }
            })
        }
    } catch (error) { console.log(error) }
}

const isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            connection.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.email = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

const logout = (req, res) =>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}

module.exports = { login, signup, logout, isAuthenticated };