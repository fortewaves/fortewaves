const express = require('express')
const { db } = require('../firebase')
const router = express.Router()

// get list fof reffered
router.get('/refer/list/:user', (req, res) => {
    const user = req.params.user

    db.ref('users').child(user).child('referals').child('people').once('value').then(snapshot=>{
        return res.json(snapshot.val())
    }).catch(err=>{
        res.status(500).json({
            err,
            message: 'failed to get referals'
        })
    })
})



// generate referal link


// other invitation means


// add to referred list


// redeem referal bonus

module.exports = router