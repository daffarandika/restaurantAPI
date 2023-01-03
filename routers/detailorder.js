const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('../database')

router.use(cors());
router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const query = `select * from detailorder`;
        const allDetailOrders = await pool.query(query);
        const detailOrders = allDetailOrders.rows;
        res.json(detailOrders);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
