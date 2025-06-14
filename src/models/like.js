import mongoose, { mongo } from "mongoose";
const likeSchema=mongoose.Schema({
    onModel:{
        type:String,
        require:true,
        enum:["Tweet","Comment"]
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:"onModel"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
})
const Like=mongoose.model("Like",likeSchema);
export default Like;