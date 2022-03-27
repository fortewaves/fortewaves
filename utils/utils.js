/// verify current token

const { db, auth } = require("../firebase");

const isTokenValid = (token) => {
  return new Promise((resolve, reject) => {
    auth
      .verifyIdToken(token)
      .then((e) => {
        resolve(e);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getKey = (email) => {
  return new Promise((resolve, reject) => {
    db.ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value", (e) => {
        const key = Object.keys(e.val())[0];
        resolve(key);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  isTokenValid,
  getKey,
};
