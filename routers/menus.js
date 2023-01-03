const express = require('express')
const multer = require('multer')
const cors = require('cors')
const router = express.Router();
const pool = require('../database')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' ' + file.originalname )
    }
})
var upload = multer({ storage: storage })

router.use(express.static('public'))
router.use(cors())
router.use(express.json())

router.get('/upload', (req, res) => {
    res.render('new-menu')
})

router.get('/:id', async (req, res) => {
    try {
        const query = `select * from menu where menuid = ${req.params.id}`;
        const menus = await pool.query(query);
        res.json(menus.rows)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const query = `select * from menu`;
        const menus = await pool.query(query);
        res.json(menus.rows)
    } catch (error) {
        res.send(error.message)
    }
})


router.get('/update', (req, res) => {
    res.render('update-menu')
})

router.post('/', upload.single('photo'), async (req, res) => {
    const {name, price} = req.body
    const photo = req.file.filename
    const query = `insert into menu (name, price, photo) values 
                    ('${name}', '${price}', '${photo}')`;
    const newmenu = await pool.query(query);
    res.send(newmenu)
})

router.put('/', upload.single('photo'), async (req, res) => {
    const {menuid, name, price} = req.body
    const photo = req.file.filename
    const query = `update menu set name = '${name}', price = '${price}', photo = '${photo}' where menuid = '${menuid}'` ;
    const updatedMenu = await pool.query(query);
    res.send(updatedMenu)
})

router.delete('/', async (req, res) => {
    const {menuid} = req.body
    const query = `delete from menu where menuid = '${menuid}'`;
    const deletedMenu = await pool.query(query);
    res.send(deletedMenu)
})

module.exports = router;
