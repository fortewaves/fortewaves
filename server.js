const bodyParser = require("body-parser")
const express = require("express")

const router = require('./routes/routes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/yes', (req, res)=>{
    console.log('accessed')
    res.json({
        yes:'yeah'
    })
})

app.use('/', router)

app.listen('3001')
