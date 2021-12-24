const express = require('express')
const router = express.Router()

const fetch = require('node-fetch')


// verify an account number
router.post('/verify-account', async (req, res)=>{

    const { accountNumber, bankCode } = req.body

  
      const fetch_res = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,{
        method: 'GET',
        headers: {
          Authorization: 'Bearer sk_live_97d1bdd1216103cffbe8f2582fc1a6159c558af8'
        }
      })

      const json = await fetch_res.json()
      res.json(json)

})

// get bank list
router.get('/banks', async res=>{

    const fetch_res = await fetch(`https://api.paystack.co/bank`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_live_97d1bdd1216103cffbe8f2582fc1a6159c558af8'
        }
    })

    const json = await fetch_res.json()
    res.json(json)

})

// generate recipient


module.exports = router