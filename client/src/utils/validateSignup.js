
export const validateSignup = (name, email , password ,confirmPassword)=>{
    if(!name) return "Enter name!!!";
    if(name.length < 3) return "Name length Should be greater than 2"
    if(!email) return "Enter Email!!!"
    if( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ) return "Email Should be Valid!!!"
    if(!password) return "Enter Password!!!"
    if(!confirmPassword) return "Enter Confirm Password"
    if(password.length<7) return "Password Should be 7 length"
    if(password!==confirmPassword) return "Password and confirm Password Not Matching !!!"

    return null;
}