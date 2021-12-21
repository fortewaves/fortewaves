const express = require('express')
const { db } = require('../firebase')
const auth = require('../firebase')

const router = express.Router()

//save user data



// get user data
router.get('/user', res=>{

})


// register user
router.post('/signup', (req,res)=>{
    console.log('hhhh')

    const email = 'ashsal.dev@gmail.com'
    const password = 'pass123'

    try{

        db.ref('users').push().set({
            email,
            password
        })

        res.send('saved')
    }catch(err){
        res.send('error occured')
    }

})

module.exports = router