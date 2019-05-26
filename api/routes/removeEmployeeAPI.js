var express = require("express");
var router = express.Router();

//Handle Firebase
const admin = require("firebase-admin");

// var serviceAccount = require("../feedback-web-app-project-firebase-adminsdk-rxe2i-46a41fe340.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
var db = admin.firestore();

router.post("/", function(req, res) {
  console.log("Remove Employee API called");
  console.log(req.body);
  db.collection("employees").doc(req.body.id).delete()
  .catch(err => {
    console.log("Error getting documents", err);
    res.send(err);
  });;
  res.send("Deleted");
});

module.exports = router;
