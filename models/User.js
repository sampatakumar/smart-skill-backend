import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String, // Firebase UID
  name: String,
  email: { type: String, unique: true },
  photoURL: String,
  provider: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  progress: [
    {
      courseId: String,
      completedLessons: Number,
    },
  ],
});

export default mongoose.model("User", userSchema);