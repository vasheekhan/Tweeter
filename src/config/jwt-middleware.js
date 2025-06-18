 import JWT from 'passport-jwt';
import User from '../models/user.js';

const JwtStrategy = JWT.Strategy; //check wheter the token is valid or not wheter the token is correct or not extraction of token from bearer tokenexpiry check payload extraction
const ExtractJwt = JWT.ExtractJwt; //this is used to tell from where the token to extract 

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'twitter_secret'
}//this describes from where to extract the header and to verify that token this is the secret key


export const passportAuth = (passport) => {
    try {
        console.log("inside strategy");;
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            console.log("req sent to strategy");
            const user = await User.findById(jwt_payload.id);
            if(!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        }));
    } catch(err) {
        console.log(err);
        throw err;
    }
    
}