// Example: generating the token with role included
const generateToken = (user) => {
    return jwt.sign(
        { user: { id: user._id, email: user.email, role: user.role } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};
