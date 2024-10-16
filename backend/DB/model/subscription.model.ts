import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  gender: string;
  role: "admin" | "user";
  isEmailVerified: boolean;
  verificationToken?: string;
  resetPasswordOTP?: string;
  otpExpiry?: Date;
}

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordOTP: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);
