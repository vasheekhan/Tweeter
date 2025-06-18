import validator from 'validator';

export const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    // Name check
    if (!name || !validator.isLength(name, { min: 3 })) {
        return res.status(400).json({ success: false, message: 'Name must be at least 3 characters long.' });
    }

    // Email check
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    // Password check
    if (
        !password ||
        !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
    ) {
        return res.status(400).json({
            success: false,
            message:
                'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.',
        });
    }

    // All good
    next();
};
