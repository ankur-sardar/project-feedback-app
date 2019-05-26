var express = require("express");
var router = express.Router();

//Handle Firebase
const admin = require("firebase-admin");


var db = admin.firestore();

router.post("/", function(req, res) {
  console.log("Update Employee API called");
  const docData = {
    id : req.body.id,
    name : req.body.name,
    reviewRequestedForEmployeesList : req.body.reviewRequestedForEmployeesList,
    reviews : []
  }
  console.log(docData);
  db.collection("employees")
    .doc(req.body.id)
    .update({
      id : req.body.id,
      name : req.body.name,
      reviewRequestedForEmployeesList : req.body.reviewRequestedForEmployeesList,
      reviews : []
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.send(err);
    });
  res.send("Updated");
});

module.exports = router;
