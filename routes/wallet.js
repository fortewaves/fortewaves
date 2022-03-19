// wallet status

const express = require('express')
const { db } = require('../firebase')

const router = express.Router()


// get wallet
const getWalletBalance = async (user) => {
    let result = []
    await db.ref('users').child(user).once('value').then((snapshot)=>{
        console.log(snapshot.val())
        result =  snapshot.val().wallet.balance
    })
    return result
}

const updateBalance = (user, newBalance) => {
    db.ref('users').child(user).child('wallet').update({
        balance: newBalance
    })
}

router.get('/wallet/:user', (req,res)=>{
    const uId =req.params.user
    console.log(req.params)
    db.ref('users').child(uId).once('value').then((snapshot)=>{
        console.log(snapshot.val())
        return res.json(snapshot.val().wallet)
    })

    
})

router.post('/wallet/increase', (req, res)=>{

    const { user, amount } = req.body

    getWalletBalance(user).then(e=>{
        const newBalance = amount+e

        updateBalance(user, newBalance)
    }).then(()=>{
        return res.send('Done success')
    })
})

router.post('/wallet/decrease', (req, res)=>{

    const { user, amount } = req.body

    getWalletBalance(user).then(e=>{
        if(e<amount){
            
            return res.status(400).send('insuficient balance')
        }else {
            const newBalance = e-amount

            updateBalance(user, newBalance)
        }
    }).then(()=>{
        return res.send('Done success')
    })
})


// get bank details
router.get('/bank/:user', (req, res) =>{

    const user = req.params.user
    db.ref('users').child(user).child('bankDetails').once('value').then(snapshot=>{
        const bankDetails = snapshot.val()

        return res.json(bankDetails)
    }).catch(err=>{
        return res.status(500).json({
            err,
            message:'failed to get bank details'
        })
    })
})


module.exports = router