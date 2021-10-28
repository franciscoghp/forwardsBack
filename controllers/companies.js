const { connection } = require('../database/db')

//Buscar compañias por id del usuario
const getCompanies = async (req, res) => {
    const id = req.params.id
    try {
        connection.query('SELECT * FROM companies WHERE user_id = ?', [id], (error, data)=>{
            if(data.length  === 0){
                res.json({
                    msg: 'There are not companies registed',
                })
            }else{
                 res.json({data})
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Something bad happened'
        });
    }
}
//Buscar compañia por id
const getCompany = async (req, res) => {
    const id = req.params.id
    try {
        connection.query('SELECT * FROM companies WHERE id = ?', [id], (error, data)=>{
            if(data.length  === 0){
                res.json({
                    msg: 'There are not companies registed',
                })
            }else{
                 res.json({data})
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Something bad happened'
        });
    }
}

const postCompany = async (req,  res) => {
    const nit = req.body.nit;
    const name = req.body.name;
    const contact_name = req.body.contact_name;
    const contact_email = req.body.contact_email;
    const user_id = req.body.user_id;
    const data = {
        nit,
        name ,
        contact_name ,
        contact_email ,
        user_id
    }
    try {
        connection.query('INSERT INTO companies SET ?', data, (error, results)=>{
            if( error){
                console.log(error)
                res.status(500).json({
                    msg: error
                })
            }else{
                res.status(201).json({
                    msg: 'Successfully Registed',
                    data
                });
            }
        })
    } catch (error) { console.log(error) }
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    console.log(newData)
    connection.query('UPDATE companies set ? WHERE id = ?', [newData, id], (error, data)=>{
        if(data.length  === 0){
            res.json({
                msg: 'There are not companies for to update',
            })
        }else{
                res.json({
                    data,
                    msg: 'Company Edited',
            })
        }
    });
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM companies WHERE id = ?', [ id ], (error, data)=>{
        if(data.length  === 0){
            res.json({
                msg: 'There are not companies registed',
            })
        }else{
                res.json({
                    data,
                    msg: 'Company Deleted',
            })
        }
    });
}

module.exports = { 
    getCompanies,
    getCompany,
    postCompany,
    deleteCompany,
    updateCompany
};