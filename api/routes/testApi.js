var express = require("express");
var router = express.Router();

//Handle Firebase
const admin = require("firebase-admin");

var serviceAccount = require("../feedback-web-app-project-firebase-adminsdk-rxe2i-46a41fe340.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

router.get("/", function(req, res, next) {
   db.collection("employees")
    .get()
    .then(snapshot => {  
      var employees = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        employees.push(doc.data());
      });
      res.send(employees);
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.send(err);
    });
});
module.exports = router;
