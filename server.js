const express = require("express")

const router = require('./routes/routes')

const app = express()



app.get('/yes', (req, res)=>{
    console.log('accessed')
    res.json({
        yes:'yeah'
    })
})

app.use('/', router)

app.listen('3001')
