
export const validateCandidateForm = (cname,address,city,pincode,age,slogans,partyName,file )=>{
    
    if(!cname) return "Please Fill the Candidate Name!!!"
    if(!address) return "Please Fill the Address!!!"
    if(!city) return "Please Fill the City!!!"
    if(!pincode) return "Please Fill the Pincode"
    if(!age) return "Please Fill the Age!!!"
    if(!/^\d+$/.test(age)) return "Age Should be Number"
    if(!slogans) return "Please Fill the Slogan!!!"
    if(!partyName) return "Please Fill the PartyName!!!"
    if(!file) return "Please Select image for Candidate"

    return null;
}