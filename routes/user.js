const express = require('express')
const { db, auth } = require('../firebase')
const moment = require('moment');

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
 const {email, name} = req.body
        // console.log(record)
    db.ref("users")
      .push()
        .set({
                email,
                name,
                wallet: {
                balance: 0.0,
                transactions: [],
            },
            profile: {
                name,
                gender: "",
                dob: "",
                address: "",
                phoneNumber: "",
            },
            referals: [],
            savings: [],
            investmants: [],
            username: "",
            bankDetails: {
                bankName: "",
                bankUserName: "",
                accountNumber: "",
                bvn: "",
            },
            createdAt: moment().toString()
        })
      .then((e) => {
        return res.json({status: true, message: 'User saved successfully'});
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
        // return res.json(record);
   
            
    
        // res.send('saved')
   

})

const saveUser = (uId, res, record) => {
    console.log(uId)
    
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
  
    db.ref('users').child(user).child('profile').update({
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