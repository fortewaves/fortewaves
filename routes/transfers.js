const express = require('express')
const router = express.Router()

const fetch = require('node-fetch')
const { db } = require('../firebase')


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
router.post('/create_recipient', async (req, res)=>{

    const { account_number, name, bank_code } = req.body
    const fetch_res = await fetch(`https://api.paystack.co/transferrecipient`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_live_97d1bdd1216103cffbe8f2582fc1a6159c558af8'
        },
        body:{
            name,
            account_number,
            bank_code,
            currency: 'NGN',
            type: 'nuban'
        }
    })

    const json = await fetch_res.json()
    res.json(json)

})


// initiate transfer
router.post('/init_transfer', async (req, res)=>{

    const { recipient_code } = req.body
    const fetch_res = await fetch(`https://api.paystack.co/transfer`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_live_97d1bdd1216103cffbe8f2582fc1a6159c558af8'
        },
        body:{
            recipient_code
        }
    })

    const json = await fetch_res.json()
    res.json(json)

})


// save transaction 
router.post('/transactions/save', (req, res)=>{

    const { user, data, type, authorizedBy } = req.body

    db.ref('transactions').push().set({
        user,
        type,
        authorizedBy,
        createdAt: moment().toString(),
        data
    }).then(()=>{
        return res.send('Transaction saved')
    }).catch(err=>{
        res.status(500).json({
            err,
            message: 'failed to save transaction'
        })
    })
})


module.exports = router