const express = require('express')
const { db } = require('../firebase')
const moment = require('moment')
const router = express.Router()

// create new room
router.post('/room/create', (req, res)=>{
    const { user, title } = req.body
    const roomId = user+title

    db.ref('rooms').child(roomId).set({
        user,
        title,
        createdAt: moment().toString()
    }).then(()=>{
        res.json({
            roomId
        })
    }).catch(err=>{
        res.status(500).json({
            err,
            message:'unable to create room'
        })
    })
})

// send message
router.post('/room/send', (req, res)=>{

    const { roomId, from, message } = req.body

    db.ref('rooms').child(roomId).child('messages').push().set({
        message,
        from,
        createdAt: moment().toString()
    }).then(()=>{
        return res.send('message sent successfully')
    }).catch(err=>{
        return res.status(500).json({
            err,
            message:'failed to send message'
        })
    })
})

// get room messages
router.get('/room/:roomId', (req, res)=>{
    const roomId = req.params.roomId

    db.ref('rooms').child(roomId).on('value', snapshot=>{
        return res.json(snapshot.val())
    })
})

module.exports = router