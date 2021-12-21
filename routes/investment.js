const express = require('express')
const router = express.Router()


router.get('/jin', (req,res)=>{
    res.json({
        ghhg:'jghg'
    })
})

module.exports = router