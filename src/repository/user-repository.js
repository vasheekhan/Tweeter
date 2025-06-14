import User from "../models/user.js";
import CrudRepository from "./CrudRepository.js";
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
}
export default UserRepository;