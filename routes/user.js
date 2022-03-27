const express = require("express");
const { db, auth } = require("../firebase");
const moment = require("moment");
const { isTokenValid, getKey } = require("../utils/utils");

const router = express.Router();

// get user data
router.get("/user/:token", (req, res) => {
  auth
    .verifyIdToken(req.params.token)
    .then((e) => {
      // console.log(e)
      const email = e.email;
      db.ref("users")
        .orderByChild("email")
        .equalTo(email)
        .once("value", (e) => {
          return res.json(e[0]);
        })
        .catch((err) => {
          return res.json(err);
        });
    })
    .catch((err) =>
      res.json({
        code: 401,
        message: "Unauthorized: Token has expired or is invalid",
      })
    );
});

// register user
router.post("/signup", (req, res) => {
  // console.log(req)
  const { email, name } = req.body;
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
      createdAt: moment().toString(),
    })
    .then((e) => {
      return res.json({ status: true, message: "User saved successfully" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  // return res.json(record);

  // res.send('saved')
});

//update profile
router.post("/user/profile", (req, res) => {
  const { phoneNumber, dob, gender, username, address, token } = req.body;

  isTokenValid(token)
    .then((e) => {
      if (e.email) {
        getKey(e.email).then((key) => {
          db.ref("users")
            .child(key)
            .child("profile")
            .update({
              phoneNumber,
              dob,
              gender,
              username,
              address,
              updatedAt: moment().toString(),
            })
            .then(() => {
              return res.send("Saved successully");
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        });
      }
    })
    .catch((err) =>
      res.json({
        code: 401,
        message: "Unauthorized: Token has expired or is invalid",
      })
    );
});

// get profile details
router.get("/user/profile/:token", (req, res) => {
    const token = req.params.token;
    
    isTokenValid(token)
      .then((e) => {
        if (e.email) {
          getKey(e.email).then((key) => {
             db.ref("users")
               .child(key)
               .once("value")
               .then((snapshot) => {
                 const profile = {
                   phoneNumber: snapshot.val().phoneNumber,
                   dob: snapshot.val().dob,
                   gender: snapshot.val().gender,
                   username: snapshot.val().username,
                   address: snapshot.val().address,
                 };
                 return res.json(profile);
               })
               .catch((err) => {
                 res.status(500).json({
                   err,
                   message: "failed to get user profile",
                 });
               });
          });
        }
      })
      .catch((err) =>
        res.json({
          code: 401,
          message: "Unauthorized: Token has expired or is invalid",
        })
      );

 
});

module.exports = router;
