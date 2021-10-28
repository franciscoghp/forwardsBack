const { connection } = require('../database/db')

//Buscar barcos por id del usuario
const getShips = async (req, res) => {
    const id = req.params.id
    try {
        connection.query('SELECT * FROM ships WHERE company_id = ?', [id], (error, data)=>{
            if(data.length  === 0){
                res.json({
                    msg: 'There are not ships registed',
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
//Buscar barco por id
const getShip = async (req, res) => {
    const id = req.params.id
    try {
        connection.query('SELECT * FROM ships WHERE id = ?', [id], (error, data)=>{
            if(data.length  === 0){
                res.json({
                    msg: 'There are not ships registed',
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

const postShip = async (req,  res) => {
    const bill_landing = req.body.bill_landing;
    const containers = req.body.containers;
    const arrival_date = req.body.arrival_date;
    const departure_date = req.body.departure_date;
    const company_id = req.body.company_id;
    const ship = req.body.ship;
    const data = {
        bill_landing,
        containers ,
        arrival_date ,
        departure_date ,
        company_id,
        ship
    }
    try {
        connection.query('INSERT INTO ships SET ?', data, (error, results)=>{
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

const updateShip = async (req, res) => {
    const { id } = req.params;
    const bill_landing = req.body.bill_landing;
    const containers = req.body.containers;
    const arrival_date = req.body.arrival_date;
    const departure_date = req.body.departure_date;
    const ship = req.body.ship;
    newData = {
         bill_landing,
         containers,
         arrival_date,
         departure_date,
         ship
    }
    connection.query('UPDATE ships set ? WHERE id = ?', [newData, id], (error, data)=>{
        if(data.length  === 0){
            res.json({
                msg: 'There are not ships for to update',
            })
        }else{
                res.json({
                    data,
                    msg: 'Ship Edited',
            })
        }
    });
}

const deleteShip = async (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM ships WHERE id = ?', [ id ], (error, data)=>{
        if(data.length  === 0){
            res.json({
                msg: 'There are not ships registed',
            })
        }else{
                res.json({
                    data,
                    msg: 'Ship Deleted',
            })
        }
    });
}

module.exports = { 
    getShips,
    getShip,
    postShip,
    deleteShip,
    updateShip
};