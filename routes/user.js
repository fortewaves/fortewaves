const express = require('express')
const { db, auth } = require('../firebase')

const router = express.Router()

//save user data



// get user data
router.get('/user/:uid', (req, res) => {
    auth.getUser(req.params.uid)
        .then(e => res.json(e))
        .catch(err => res.status(500).json(err))
    
})


// register user
router.post('/signup', (req,res)=>{
    console.log(req)
 const {email, password, name} = req.body
  
   
    auth.createUser({
        email,
        password,
        name
    }).then(record=>{
        // console.log(record)
        saveUser(record.uid, res, record)
        // return res.json(record);
    }).catch(err=>{
        return res.json(err)
    })
            
        // res.send('saved')
   

})

const saveUser = (uId, res, record) => {
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
        return res.json(record)
    }).catch(err=>{
        return res.status(500).json(err)
    })
    // res.json(result)
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

// get profile details
router.get('/user/profile/:user',(req,res)=>{
    const user = req.params.user
  
    db.ref('users').child(user).once('value').then((snapshot)=>{
        const profile = {
            phoneNumber: snapshot.val().phoneNumber,
            dob: snapshot.val().dob,
            gender: snapshot.val().gender,
            username: snapshot.val().username,
            address: snapshot.val().address,
        }
        return res.json(profile)
    }).catch((err)=>{
        res.status(500).json({
            err,
            message:'failed to get user profile'
        })
    })
})

module.exports = router