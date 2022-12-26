const express = require('express');
const employeeRouter = require('./routers/employees')
const app = express();

app.use('/employee', employeeRouter)

app.listen(5000);
