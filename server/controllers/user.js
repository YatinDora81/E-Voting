const CityModel = require("../models/city");
const CandidateModel = require("../models/candidate");
const { transporter } = require("../config/transporter");
const { getOtp } = require("../utils/otpGenerator");
const VotedModel = require("../models/voted")

exports.getAllCandiates = async (req, res) => {
  try {
    const data = await CandidateModel.find({});
    const city = await CityModel.find({});
    const allVotes = await VotedModel.find({});

    return res.status(200).json({
      success: true,
      data: data,
      city: city,
      allVotes : allVotes,
      message: "Successfully Fetch All Candidates Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: true,
      error: error,
      message: "Failed in Fetch candidates data . Please Try Again Later",
    });
  }
};

exports.getAllCity = async (req, res) => {
  try {
    const data = await CityModel.find({});

    return res.status(200).json({
      success: true,
      data: data,
      message: "Successfully Fetch All City Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: true,
      error: error,
      message: "Failed in Fetch City data . Please Try Again Later",
    });
  }
};

exports.getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter a email",
      });
    }

    const opt = getOtp(6);

    const info = await transporter.sendMail({
      from: '"Otp For EVoting" <yatin.dorapvt@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Otp For EVoting", // Subject line
      // html: `<b>otp is ${opt}</b>`, // html body
      html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f6f6f6;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 10px 0;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .otp-code {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #999999;
            font-size: 12px;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          .website-name {
            /* color: #4CAF50; */
            border: 1px solid black;
            padding: 2px;
            padding-inline: 10px;
              font-style: italic;
            font-weight: bold;
          }
          .website-name span {
            color: #000000;
          }
          .buttonemail {
            background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>OTP Verification</h1>
          </div>
          <div class="content">
            <p>Dear ${email},</p>
            <p>Thank you for choosing <span class="website-name">E<span>Voting</span></span>. Please use the following One-Time-Password (OTP) to complete your verification:</p>
            <div class="otp-code buttonemail">${opt}</div>
            <p>This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.</p>
          </div>
          <div class="footer">
            <p>If you did not request this, please ignore this email or contact support.</p>
            <p>Thank you!</p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    // console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      success: true,
      otp: opt,
      reciverMail: email,
      message: "Mail Send Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in sending otp mail to user . Please try again later!!!",
    });
  }
};

exports.addVote = async (req, res) => {
  try {
    const { candidateId, email } = req.body;

    if (!candidateId || !email) {
      return res.status(400).json({
        success: false,
        message: "Please enter a CandidateId and valid email",
      });
    }

    const user = await CandidateModel.findOne({ _id: candidateId });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please enter a valid id ",
      });
    }

    const updateuser = await CandidateModel.findOneAndUpdate(
      { _id: candidateId },
      { $push: { votes: "." } },
      { new: true }
    );

    const newVote = await VotedModel.create({name : email});

    return res.status(200).json({
      success: true,
      data: updateuser,
      message: "Successfully added email to candidate votes",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed in adding votes . Try Again Later!!!",
    });
  }
};
