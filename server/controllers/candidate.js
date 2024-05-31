const CityModel = require("../models/city");
const CandidateModel = require("../models/candidate");
const mongoose = require("mongoose");

exports.createCandidate = async (req, res) => {
  try {
    const {
      cname,
      address,
      city,
      pincode,
      age,
      slogans,
      partyName,
      imageUrl,
      createdByEmail,
    } = req.body;

    if (!createdByEmail) {
      return res.status(400).json({
        success: false,
        message: "Please Fill Email also",
      });
    }

    //check email if it already exist
    const checkemail = await CandidateModel.findOne({
      createdByEmail: createdByEmail,
    });
    if (checkemail) {
      return res.status(400).json({
        success: false,
        message:
          "Candidate already Exists with your email . Please try with different email id",
      });
    }

    if (
      !cname ||
      !address ||
      !city ||
      !pincode ||
      !age ||
      !slogans ||
      !partyName ||
      !imageUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All The Details",
      });
    }

    const existParty = await CandidateModel.findOne({
      partyName: partyName,
      city: city,
    });
    if (existParty) {
      return res.status(401).json({
        success: false,
        message: "Party Candidate Already exist in given city",
      });
    }

    const iscity = await CityModel.findOne({ name: city });
    if (!iscity) {
      const newcity = await CityModel.create({ name: city, value: "Yes" });
    }

    const newcandidate = await CandidateModel.create({
      cname,
      city,
      address,
      pincode,
      age,
      slogans,
      partyName,
      imageUrl,
      visible: "na",
      createdByEmail,
    });

    return res.status(200).json({
      success: true,
      candidateData: newcandidate,
      message: "Candidate Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong in Creating candidate . Please try again later",
    });
  }
};



// exports.checkCandidate = async (req,res)=>{
//   try {

//     const { email } = req.body;

//     if(!email){
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please fill email",
//       });
//     }

//     const user = await CandidateModel.findOne({createdByEmail : email});

//     if(user){
//       return res.status(500).json({
//         success : true,
//         value : true,
//         message : "Candidate exist with this email"
//       })
//     }
    
//   } catch (error) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message:
//         "Something went wrong in Checking candidate . Please try again later",
//     });
//   }
// }