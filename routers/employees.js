const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database');
const crypto = require('crypto');

function toSha256 (input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

router.use(cors());
router.use(express.json())

router.get('/', async (req, res) => {

    try {
        const allEmployees = await pool.query(`select * from employee`)
        var employee = allEmployees.rows
        res.json(( employee  ))
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }

})

router.post('/', async (req, res) => {

    try {
        var employee = req.body
        employee = employee[0]
        employee.password = toSha256( employee.password );
        const query = `INSERT INTO employee (name, email, password, handphone) 
            VALUES ('${employee.name}', '${employee.email}', '${employee.password}', '${employee.handphone}')`
        const newEmployee = await pool.query(query)
        res.json(req.body)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.put('/', async (req, res) => {

    try {
        var employee = req.body;
        employee = employee[0];
        employee.password = toSha256( employee.password );
        const query = `update employee set name = '${employee.name}',
            email = '${employee.email}', password = '${employee.password}', 
            handphone = '${employee.handphone}' where employeeid = '${employee.employeeid}'`;
        const updatedEmployee = await pool.query(query);
        res.json(updatedEmployee)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.delete('/', async (req, res) => {
    try {
        var employee = req.body;
        employee = employee[0];
        const query = `delete from employee where employeeid = ${employee.employeeid}`;
        const deletedEmployee = await pool.query(query);
        res.send(deletedEmployee);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
