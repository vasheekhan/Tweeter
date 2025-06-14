import Like from "../models/like";
import CrudRepository from "./CrudRepository";
class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }

}
export default LikeRepository;