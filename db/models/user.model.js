import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    passwordChangedAt: Date,
    otpExpiresAt: Date,
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    loggedIn: {
        type: Boolean,
        default: false,
    },
    OTP: {
        type: String,
        default: "",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })


userSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value
    })

userSchema.pre('validate', async function (next) {
    if (this.isNew && this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hashSync(this.password, process.env.SALT_ROUNDS * 1)
    next();
})

userSchema.pre('save', function (next) {
    if (this.isModified('password') && !this.isNew) {
        this.passwordChangedAt = new Date();
    }
    next();
});

userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema)

export default User