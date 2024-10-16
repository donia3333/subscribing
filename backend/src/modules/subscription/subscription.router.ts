import express from "express";
import {
  getUsers,
  login,
  signup,
  verifyEmail,
} from "./subscription.controller";

const userRouter = express.Router();

userRouter.post("/signUp", signup);
userRouter.get("/verify-email", verifyEmail);
userRouter.get("/getUsers", getUsers);
userRouter.post("/login", login);

export default userRouter;
