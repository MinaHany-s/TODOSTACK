import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  color: {
    type: String,
    default: '#cccccc', // for UI support
  },
  isPinned: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export const Tag = mongoose.model('Tag', tagSchema);
