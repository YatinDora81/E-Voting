const CityModel = require("../models/city");
const CandidateModel = require("../models/candidate");

exports.approveCity = async (req,res)=>{
    try {
        const {name} =req.body;

        if(!name){
            return res.status(400).json({
                success : false,
                message : "Enter a city name"
            })
        }

        const cityData = await CityModel.findOne({name : name});

        if(!cityData){
            return res.status(400).json({
                success : false,
                message : "City is not present in data base"
            })
        }


        cityData.value = "yes"

        await cityData.save();

        return res.status(200).json({
            success : true,
            data : cityData,
            message : "City is approved now user can see and vote"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            error : error,
            message : "Error in approving city for voting . try again later!!!"
        })
    }
}


exports.rejectCity = async (req,res)=>{
    try {
        const {name} =req.body;

        if(!name){
            return res.status(400).json({
                success : false,
                message : "Enter a city name"
            })
        }

        const cityData = await CityModel.findOne({name : name});

        if(!cityData){
            return res.status(400).json({
                success : false,
                message : "City is not present in data base"
            })
        }


        cityData.value = "no"

        await cityData.save();

        return res.status(200).json({
            success : true,
            data : cityData,
            message : "City is rejected now user cannot see and vote"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            error : error,
            message : "Error in rejecting city for voting . try again later!!!"
        })
    }
}



exports.approveCandidate = async (req,res)=>{
    try {
        const {id} = req.body //candidate id
        
        if(!id){
            return res.status(400).json({
                success : false,
                message : "Enter a Candidate id"
            })
        }

        const candidateData = await CandidateModel.findOne({_id:id});

        if(!candidateData){
            return res.status(400).json({
                success : false,
                message : "Candidate is not present in data base , please try with a valid id."
            })
        }

        candidateData.visible = "yes";

        await candidateData.save()

        return res.status(200).json({
            success : true,
            data : candidateData,
            message : "Candidate is approved now user can see and vote"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            error : error,
            message : "Error in approving candidate for voting . try again later!!!"
        })
    }
}


exports.rejectCandidate = async (req,res)=>{
    try {
        const {id} = req.body //candidate id
        
        if(!id){
            return res.status(400).json({
                success : false,
                message : "Enter a Candidate id"
            })
        }

        const candidateData = await CandidateModel.findOne({_id:id});

        if(!candidateData){
            return res.status(400).json({
                success : false,
                message : "Candidate is not present in data base , please try with a valid id."
            })
        }

        candidateData.visible = "no";

        await candidateData.save()

        return res.status(200).json({
            success : true,
            data : candidateData,
            message : "Candidate is rejected now user cannot see and vote"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            error : error,
            message : "Error in rejected candidate for voting . try again later!!!"
        })
    }
}