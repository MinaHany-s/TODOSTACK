import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
  },
  remindAt: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
  },


}, { timestamps: true });

export const Reminder = mongoose.model('Reminder', reminderSchema);
