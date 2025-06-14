import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
   name: {
    type: String,
    minlength: [3, "Enter a valid name with at least 3 characters"]
}

})
const User=mongoose.model("User",userSchema);
export default User;