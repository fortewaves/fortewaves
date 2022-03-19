const express = require('express')
const router = express.Router()
const moment = require('moment')

const { db } = require('../firebase')

// get investments by user
router.get('/investments/:user', (req,res)=>{
    const user = req.params.user

    db.ref('investments').orderByChild('user').equalTo(user).once('value').then(snapshot=>{
        return res.json(snapshot.val())
    }).catch(err=>{
        return res.status(500).json({
            err,
            message: 'failed to get investments'
        })
    })
    
    res.json({
        ghhg:'jghg'
    })
})

// get all investments
router.get('/investments', (req, res) =>{

    db.ref('investments').once('value').then(snapshot=>{
        return res.json(snapshot.val())
    }).catch(err=>{
        console.log(err)
    })
    
})


// add new investment
router.post('/investment/add', (req, res) =>{
    const { user, sponsor, amount, name, reference, percentage } = req.body

    db.ref('investments').push().set({
        user,
        sponsor,
        amount,
        name,
        percentage,
        reference,
        createdAt: moment().toString(),
    }).then(()=>{
        return res.send('Investment created successfully')
    }).catch(err=>{
        res.status(500).json({
            err,
            message:'Failed to add investment'
        })
    })
})



module.exports = router