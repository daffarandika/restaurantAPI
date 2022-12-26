const express = require('express')
const router = express.Router();
const cors = require('cors')

router.use(cors())
router.use(express.json())

router.get('/', (req, res) => {
    res.render('new-menu');
})

module.exports = router;
