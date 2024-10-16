import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { userModel } from "../../../DB/model/subscription.model";

const JWT_SECRET = "your_jwt_secret";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rosheta950@gmail.com",
    pass: "xfne nzbw zdyr dxmz",
  },
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password, email, gender, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return; // Ensure you return to stop execution if the user exists
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = new userModel({
      userName,
      password: hashedPassword,
      email,
      gender,
      role: role || "user", // Default to "user" if role is not provided
      verificationToken,
    });

    await newUser.save();

    const verificationLink = `http://localhost:5000/users/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: '"YourApp" <rosheta950@gmail.com>',
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
    });

    res
      .status(201)
      .json({ message: "Signup successful. Please verify your email." });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  if (!token) {
    res
      .status(400)
      .json({ message: "Token is required for email verification." });
  } else {
    try {
      const decoded: any = jwt.verify(token as string, JWT_SECRET);

      const user = await userModel.findOne({ email: decoded.email });
      if (!user) {
        res
          .status(400)
          .json({ message: "Invalid token or user does not exist." });
      } else if (user.isEmailVerified) {
        res.status(400).json({ message: "Email is already verified." });
      } else {
        user.isEmailVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email successfully verified." });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token." });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Find users with role "user" and select only the email field
    const users = await userModel.find({ role: "user" }).select("email role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password." });
      return;
    }
    if (!user.isEmailVerified) {
      res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
      return;
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful.", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
