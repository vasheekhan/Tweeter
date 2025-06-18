import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
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
userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, 'twitter_secret', {
        expiresIn: '1h'
    });
}
const User=mongoose.model("User",userSchema);
export default User;