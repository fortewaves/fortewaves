
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fortewaves-12870-default-rtdb.firebaseio.com"
});


module.exports = {
  db: admin.database()
}