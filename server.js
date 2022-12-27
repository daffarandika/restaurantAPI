const express = require('express');
const employeeRouter = require('./routers/employees')
const menuRouter = require('./routers/menus')
const memberRouter = require('./routers/members')
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs')


app.use('/employee', employeeRouter)
app.use('/menu', menuRouter)
app.use('/member', memberRouter)


app.listen(5000);
