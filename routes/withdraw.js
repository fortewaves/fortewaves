const express = require('express')
const router = express.Router()


router.post('/withdraw', (req, res) => {
    const { recepient, amount } = req.body
    // 1. make a transfer to the recipient


    // 2. deduct the balance from the wallet
    
    
    // 3. update transactions
})


module.exports = router