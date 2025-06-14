import Like from "../models/like.js";
import CrudRepository from "./CrudRepository.js";
class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }
async findByUserAndLikeable(data){
    try {
        const like=await Like.findOne(data);
        return like;
    } catch (error) {
        console.log("Something went wrong in like repo");
      throw error;  
    }
}
}
export default LikeRepository;