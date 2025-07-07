import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import * as UC from './user.controller.js'
import * as UV from './user.validations.js'
import validate from "../../middlewares/validate.js";
import systemRoles from "../../constants/systemRoles.js";
import auth from "../../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post('/sign-up',
    validate(UV.signUpValidation),
    asyncHandler(UC.signUp)
)
userRouter.get('/verifyEmail/:token',
    validate(UV.verifyEmailValidation),
    asyncHandler(UC.verifyEmail)
)
userRouter.get('/rfVerifyEmail/:token',
    validate(UV.verifyEmailValidation),
    asyncHandler(UC.rfVerifyEmail)
)
userRouter.patch('/forget-password',
    validate(UV.forgetPasswordValidation),
    asyncHandler(UC.forgetPassword)
)
userRouter.patch('/reset-password',
    validate(UV.resetPasswordValidation),
    asyncHandler(UC.resetPassword)
)

userRouter.post('/log-in',
    validate(UV.logInValidation),
    asyncHandler(UC.logIn)
)

userRouter.post('/log-out',
    auth([systemRoles.admin, systemRoles.user]),
    validate(UV.logOutValidation),
    asyncHandler(UC.logOut)
)

userRouter.get('/',
    auth([systemRoles.admin, systemRoles.user]),
    validate(UV.getProfileValidation),
    asyncHandler(UC.getProfile)
)

userRouter.patch('/',
    validate(UV.updateProfileValidation),
    auth([systemRoles.admin, systemRoles.user]),
    asyncHandler(UC.updateProfile)
)
userRouter.patch('/change-password',
    validate(UV.changePasswordValidation),
    auth([systemRoles.admin, systemRoles.user]),
    asyncHandler(UC.changePassword)
)

export default userRouter