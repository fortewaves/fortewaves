const express = require("express");
const router = express.Router();
const moment = require("moment");

const { db } = require("../firebase");

// get investments by user
router.get("/investments/:token", (req, res) => {
  const token = req.params.token;

  isTokenValid(token)
    .then((e) => {
      if (e.email) {
        getKey(e.email).then((key) => {
          db.ref("investments")
            .orderByChild("author")
            .equalTo(key)
            .once("value")
            .then((snapshot) => {
              const investments = Object.values(snapshot.val());
              return res.json(investments);
            })
            .catch((err) => {
              return res.status(500).json({
                err,
                message: "failed to get investments",
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

// get all investments
router.get("/investments", (req, res) => {
  db.ref("investments")
    .once("value")
    .then((snapshot) => {
      return res.json(snapshot.val());
    })
    .catch((err) => {
      console.log(err);
    });
});

// add new investment
router.post("/investment/add", (req, res) => {
  const { token, sponsor, amount, name, paymentRreference, percentage } =
    req.body;

  isTokenValid(token)
    .then((e) => {
      if (e.email) {
        getKey(e.email).then((key) => {
          db.ref("investments")
            .push()
            .set({
              author: key,
              sponsor,
              amount,
              name,
              percentage,
              paymentRreference,
              createdAt: moment().toString(),
            })
            .then(() => {
              return res.send("Investment created successfully");
            })
            .catch((err) => {
              res.status(500).json({
                err,
                message: "Failed to create investment",
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
