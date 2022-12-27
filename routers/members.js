const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database');


router.use(cors());
router.use(express.json())

router.get('/', async (req, res) => {

    try {
        const allMember = await pool.query(`select * from member`)
        var member = allMember.rows
        res.json(member)
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }

})

router.post('/', async (req, res) => {

    try {
        var member = req.body
        member = member[0]

        const today = new Date(Date.now())

        const query = `INSERT INTO member (name, email, handphone, joindate) 
            VALUES ('${member.name}', '${member.email}', 
            '${member.handphone}', '${today.toISOString()}')`
        const newMember = await pool.query(query)
        res.json(newMember)

    } catch (error) {
        res.status(500).send(query + error.message)
    }

})

router.put('/', async (req, res) => {

    try {
        var member = req.body;
        member = member[0];
        const query = `update member set name = '${member.name}',
            email = '${member.email}', handphone = '${member.handphone}',
            joindate = '${member.joindate}'
            where memberid = '${member.memberid}'`;
        const updatedMember = await pool.query(query);
        res.json(updatedMember)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.delete('/', async (req, res) => {
    try {
        var member = req.body;
        member = member[0];
        const query = `delete from member where memberid = ${member.memberid}`;
        const deletedMember = await pool.query(query);
        res.send(deletedMember);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
