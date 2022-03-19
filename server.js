const bodyParser = require("body-parser")
const express = require("express")
const cors = require('cors')

const router = require('./routes/routes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


    // Pass to next layer of middleware
    next();
});

app.get('/yes', (req, res)=>{
    console.log('accessed')
    res.json({
        yes:'yeah'
    })
})

app.use('/', router)

app.listen(process.env.PORT || '3001')
