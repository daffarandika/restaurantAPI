const express = require('express');
const employeeRouter = require('./routers/employees')
const menuRouter = require('./routers/menus')
const fileUpload = require('express-fileupload')
const app = express();

app.set('view engine', 'ejs')

app.use(fileUpload())

app.use('/employee', employeeRouter)
app.use('/menu', menuRouter)

app.post('/upload', (req, res) => {
    const { image } = req.files;
    if (!image) return res.sendStatus(400);
    image.mv(__dirname + '/images/' + image.name);
    console.log(req.files);
    res.send(__dirname + '/images/' + image.name)
})

app.listen(5000);
