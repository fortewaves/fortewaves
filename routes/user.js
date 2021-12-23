const express = require('express')
const { db, auth } = require('../firebase')

const router = express.Router()

//save user data



// get user data
router.get('/user/:email', (req,res)=>{

    const result = {
        data:null,
        message:null
    }

    (async () => {
        await auth.getUserByEmail(req.params.email).then(record=>{
            console.log(record)
            res.json(record)
            result.data=record
            result.message="saved successfully"
        }).catch(err=>{
            result.data=err,
            result.message=err.message
        })
        res.json(result)
    })()
})


// register user
router.post('/signup', (req,res)=>{
    console.log(req)
 const {email, password, name} = req.body
    // const email = 'ashsal.dev@gmail.com'
    // const password = 'pass123
    const result = {
        data:null,
        status: 200,
        message:null
    }


        const model = async () => {
            await auth.createUser({
                email,
                password,
                name
            }).then(record=>{
                // console.log(record)
                result.data=record
                result.message="saved successfully"
                saveUser(record.uid, res, result)
            }).catch(err=>{
                result.data=err,
                result.status=500
                result.message=err.message
            })
            res.json(result)
        }
        model()
        // res.send('saved')
   

})

const saveUser = (uId, res, result) => {
    console.log(uId)
    db.ref('users').child(uId).set({
        wallet: {
            balance: 0.0,
            transactions: []
        },
        referals: [],
        savings:[],
        investmants: [],
        phoneNumber: '',
        username: '',
        gender: '',
        dob: '',
        address: '',
        bankDetails: {
            bankName: '',
            bankUserName: '',
            accountNumber: '',
            bvn: '',
        }
    }).then(e=>{
        result.message='success'
    }).catch(err=>{
        result.message='Failed'
        result.status=500
    })
    res.json(result)
}



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


//update profile
router.post('/user/profile',(req, res)=>{
    const { phoneNumber, dob, gender, username, address, user } = req.body
  
    db.ref('users').child(user).update({
        phoneNumber,
        dob,
        gender,
        username,
        address
    }).then(()=>{
        return res.send('Saved successully')
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

module.exports = router