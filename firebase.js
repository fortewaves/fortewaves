
var admin = require("firebase-admin");
require('firebase/auth');
require('firebase/database');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fortewaves-12870-default-rtdb.firebaseio.com"
});


module.exports = {
  db: admin.database(),
  auth: admin.auth(),
  storage: admin.storage()
}