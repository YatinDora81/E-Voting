
export const validateLogin = ( email , password )=>{
    if(!email) return "Enter Email!!!"
    if( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ) return "Email Should be Valid!!!"
    if(!password) return "Enter Password!!!"
    if(password.length<7) return "Password Should be 7 length"

    return null;
}