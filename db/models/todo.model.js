import mongoose from "mongoose";


const todoSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: 100,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    dueDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    photo: [{
        secure_url: String,
        public_id: String
    }],
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    },
    reminder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reminder',
    },
    reminderSent: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true })

export const Todo = mongoose.model('Todo', todoSchema);
