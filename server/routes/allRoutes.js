const express = require("express")
const router = express.Router()


// user
const {getAllCandiates,getAllCity ,getOtp, addVote} = require("../controllers/user")

router.get("/get-all-candiates" , getAllCandiates);
router.get("/get-all-city" , getAllCity);
router.post("/get-otp" , getOtp)
router.post("/add-vote" , addVote)


// candidate
const {createCandidate , checkCandidate} = require("../controllers/candidate")

router.post( "/create-candidate" , createCandidate );
// router.post("/check-candidate" ,checkCandidate );

// admin
const {approveCity , rejectCity , approveCandidate , rejectCandidate} = require("../controllers/admin")

router.post( "/approve-city" , approveCity );
router.post( "/reject-city" , rejectCity );
router.post( "/approve-candidate" , approveCandidate );
router.post( "/reject-candidate" , rejectCandidate );

module.exports = router