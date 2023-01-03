const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('../database');

router.use(cors());
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const query = `select * from headorder`;
        const allOrders = await pool.query(query);
        const order = allOrders.rows;
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        var headorder = req.body
        headorder = headorder[0];
        const query = `insert into headorder (employeeid, memberid, date, payment) values
                        ('${headorder.employeeid}', '${headorder.memberid}', '${headorder.date}', ${headorder.payment})`;
        res.send(query);
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = (router)
