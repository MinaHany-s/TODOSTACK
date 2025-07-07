import jwt from 'jsonwebtoken';
import appError from '../utils/appError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../../db/models/user.model.js';

const auth = (allowedRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const rawToken = req.headers.authorization || req.headers.token;

        if (!rawToken || !rawToken.startsWith(process.env.TOKEN_PREFIX)) {
            return next(new appError("No valid token found", 401));
        }

        const token = rawToken.replace(process.env.TOKEN_PREFIX, '').slice(1);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);
        } catch (err) {
            return next(new appError("Invalid token", 401));
        }

        if (!decoded?.email) {
            return next(new appError("Invalid token payload", 401));
        }

        const user = await User.findOne({ email: decoded.email, loggedIn: true });

        if (!user) {
            return next(new appError("User not found or logged out", 404));
        }

        // Check if password changed after token was issued
        if (
            user.passwordChangedAt &&
            parseInt(user.passwordChangedAt.getTime() / 1000) > decoded.iat
        ) {
            return next(new appError("Token expired. Please log in again.", 403));
        }

        // Role-based access control
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            return next(new appError("Unauthorized: You do not have permission", 403));
        }

        req.user = user;
        next();
    });
};

export default auth;
