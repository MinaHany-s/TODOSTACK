import User from "../../../db/models/user.model.js"
import jwt from 'jsonwebtoken'
import sendEmail from "../../utils/sendEmail.js"
import htmlContent from "../../constants/verfyEmailHtml.js"
import appError from "../../utils/appError.js"
import { customAlphabet } from "nanoid"
import otpEmailContent from "../../constants/otpEmailHtml.js"


export const signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword, birthDate } = req.body

    const userExist = await User.findOne({ email })
    if (userExist && !userExist.isEmailVerified) {
        return next(new appError("Please verify your email", 404));
    }
    if (userExist) {
        return next(new appError("User already exists", 409));
    }

    const token = jwt.sign({ email }, process.env.TOKEN_SIGN_SECRET, { expiresIn: '30m' })
    const link = `${req.protocol}://${req.headers.host}/api/v1/users/verifyEmail/${token}`;

    const rfToken = jwt.sign({ email }, process.env.TOKEN_SIGN_SECRET);
    const rfLink = `${req.protocol}://${req.headers.host}/api/v1/users/rfVerifyEmail/${rfToken}`;

    await sendEmail(email, "TODOSTACK Verify Email", htmlContent(link, rfLink));

    const user = new User({
        name,
        email,
        password,
        confirmPassword,
        birthDate
    })
    req.data = {
        model: User,
        _id: user._id
    }
    const newUser = await user.save()

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    if (newUser) {
        res.status(201).json({
            status: "success",
            message: `User created successfully. Please check your email`,
            User: userWithoutPassword,
            timestamp: new Date().toISOString()
        })
    } else {
        next(new appError("User not created", 400));
    }
}
export const verifyEmail = async (req, res, next) => {
    const { token } = req.params;
    let decoded
    try {
        decoded = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new appError('Verification link has expired. Please request a new one.', 400));
        }
        return res.status(500).json({
            status: "error",
            error: err.message,
            message: `Internal error`,
            timestamp: new Date().toISOString()
        })
    }

    if (!decoded?.email) {
        return next(new appError("Invalid or expired verification link", 400));
    }
    const user = await User.findOneAndUpdate(
        { email: decoded.email, isEmailVerified: false },
        { isEmailVerified: true },
        { new: true }
    );


    if (user) {
        return res.status(200).json({
            status: "success",
            message: `Email verification successful`,
            user,
            timestamp: new Date().toISOString()
        });
    }
    return res.status(409).json({ message: "User is already verified" });
}
export const rfVerifyEmail = async (req, res, next) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);

    if (!decoded?.email) {
        return next(new appError("Invalid verification link", 400));
    }

    const { email } = decoded;

    const user = await User.findOne({ email, isEmailVerified: true });
    if (user) {
        return res.status(409).json({
            status: "error",
            message: `User is already verified`,
            timestamp: new Date().toISOString()
        });
    }

    const newToken = jwt.sign({ email: email }, process.env.TOKEN_SIGN_SECRET, { expiresIn: "30m" });
    const verificationLink = `${req.protocol}://${req.headers.host}/api/v1/users/verifyEmail/${newToken}`;

    const newRfToken = jwt.sign({ email: email }, process.env.TOKEN_SIGN_SECRET);
    const refreshLink = `${req.protocol}://${req.headers.host}/api/v1/users/rfVerifyEmail/${newRfToken}`;

    await sendEmail(email, "TODOSTACK Verify Email", htmlContent(verificationLink, refreshLink));

    return res.status(200).json({
        status: "success",
        message: `Email sent successful`,
        timestamp: new Date().toISOString()
    });

}

export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        return next(new appError("User not exists", 404));
    }
    if (!user.isEmailVerified) {
        return next(new appError("Please verify your email", 400));
    }

    const otpf = customAlphabet("0123456789", 6)
    const otp = otpf();

    await sendEmail(email, "Reset Password Code", otpEmailContent(otp));

    user.OTP = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await user.save()

    return res.status(200).json({
        status: "success",
        message: `Check your email for the OTP.`,
        timestamp: new Date().toISOString()
    })
}

export const resetPassword = async (req, res, next) => {
    const { email, OTP, newPassword, cPassword } = req.body
    if (newPassword !== cPassword) {
        return next(new appError("Passwords do not match", 400));
    }
    const user = await User.findOne({ email })

    if (!user) {
        return next(new appError("User not exists", 404));
    }

    if (!user.isEmailVerified) {
        return next(new appError("Please verify your email first", 400));
    }

    if (user.OTP !== OTP || !OTP) {
        return next(new appError("OTP is not correct", 400));
    }
    if (!user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
        user.OTP = "";
        user.otpExpiresAt = null;
        await user.save();
        return next(new appError("OTP has expired. Please request a new one.", 400));
    }

    user.password = newPassword;
    user.confirmPassword = cPassword;
    user.OTP = "";
    user.otpExpiresAt = null;

    await user.save();

    return res.status(200).json({
        status: "success",
        message: `Password changed succefully.`,
        timestamp: new Date().toISOString()
    })

}


export const logIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new appError("Email or password are not correct", 400));
    }
    if (!user.isEmailVerified) {
        return next(new appError("Verify your email first", 400));
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new appError('Invalid email or password', 401));
    }
    const accessToken = jwt.sign({ email, userId: user._id, role: user.role }, process.env.TOKEN_SIGN_SECRET, { expiresIn: '30d' })

    user.loggedIn = true;
    await user.save()

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;


    return res.status(200).json({
        status: "success",
        message: `User logged in succefully`,
        token: accessToken,
        user: userWithoutPassword,
        timestamp: new Date().toISOString()
    })

}
export const logOut = async (req, res, next) => {

    await User.findByIdAndUpdate(req.user._id, { loggedIn: false })

    return res.status(200).json({
        status: "success",
        message: `Logut successful`,
        timestamp: new Date().toISOString()
    })

}
export const getProfile = async (req, res, next) => {

    const user = req.user.toObject?.() || req.user;

    delete user.password;
    delete user.OTP;
    delete user.otpExpiresAt;
    delete user.passwordChangedAt;
    delete user.__v;


    return res.status(200).json({
        status: "success",
        message: `User retrieved successfully`,
        user,
        timestamp: new Date().toISOString()
    })

}
export const updateProfile = async (req, res, next) => {
    const userId = req.user._id;
    const { name, password, confirmPassword, birthDate, role } = req.body;

    const user = await User.findById(userId).select('+password');
    if (!user) {
        return next(new appError("User not found", 404));
    }

    if (name) user.name = name;
    if (birthDate) user.birthDate = birthDate;
    if (role) user.role = role;

    if (password) {
        if (password !== confirmPassword) {
            return next(new appError("Passwords do not match", 400));
        }
        user.password = password
        user.confirmPassword = confirmPassword;
    }

    await user.save();

    const updatedUser = user.toObject();

    delete updatedUser.password;
    delete updatedUser.OTP;
    delete updatedUser.otpExpiresAt;
    delete updatedUser.passwordChangedAt;
    delete updatedUser.__v;


    res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        user: updatedUser,
        timestamp: new Date().toISOString()
    });
}
export const changePassword = async (req, res, next) => {
    const userId = req.user._id;
    const { password, confirmPassword } = req.body;

    const user = await User.findById(userId).select('+password');
    if (!user) {
        return next(new appError("User not found", 404));
    }
    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) {
        return next(new appError("New password must be different from the old password", 400));
    }
    if (password) {
        if (password !== confirmPassword) {
            return next(new appError("Passwords do not match", 400));
        }
        user.password = password
        user.confirmPassword = confirmPassword;
    }

    await user.save();


    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
        timestamp: new Date().toISOString()
    });
}