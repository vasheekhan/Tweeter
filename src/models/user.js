import mongoose from "mongoose";
import bcrypt from 'bcrypt';
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
userSchema.pre('save', function (next) {
    const user = this; //current user
    const SALT = bcrypt.genSaltSync(9); //function for generating salt with number of rounds
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next(); //next function
});
const User=mongoose.model("User",userSchema);
export default User;