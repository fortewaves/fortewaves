const express = require('express')
const { db, auth } = require('../firebase')

const router = express.Router()

//save user data



// get user data
router.get('/user', res=>{

})


// register user
router.post('/signup', (req,res)=>{
    console.log(req)
 const {email, password, name} = req.body
    // const email = 'ashsal.dev@gmail.com'
    // const password = 'pass123
    const result = {
        data:null,
        message:null
    }

    try{

        const model = async ()=>{
            await auth.createUser({
                email,
                password,
                name
            }).then(record=>{
                console.log(record)
                res.json(record)
                result.data=record
                result.message="saved successfully"
            }).catch(err=>{
                result.data=err,
                result.message=err.message
            })
            res.json(result)
        }
        model()
        // res.send('saved')
    }catch(err){
        res.send('error occured')
        console.log(err)
    }

})



// login

router.post('/login', (req, res)=>{
    const {email, password} = req.body
    // const email = 'ashsal.dev@gmail.com'
    // const password = 'pass123
    const result = {
        data:null,
        message:null
    }

    try{

        const model = async ()=>{
            await auth.getUserByEmail(email).then(record=>{
                console.log(record)
                res.json(record)
                result.data=record
                result.message="saved successfully"
            }).catch(err=>{
                result.data=err,
                result.message=err.message
            })
            res.json(result)
        }
        model()
        // res.send('saved')
    }catch(err){
        res.send('error occured')
        console.log(err)
    }
})

module.exports = router