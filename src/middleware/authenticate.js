import passport from "passport";

export const authenticate = (req, res, next) => { 
    passport.authenticate('jwt', (err, user) => {//ussi configuration use karta hai aur agar kuch error hoti hai to usko btata hai ya phir user nhi milta hai to usko btata hai warna req object me bind karke user ko aage send kardeta hai
        if(err) next(err);
        if(!user) {
            return res.status(401).json({
                message: 'Unauthorised access no token'
            })
        }
        req.user = user;
        next();
    })(req, res, next);
}