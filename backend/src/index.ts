import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { DbConnection } from "./../DB/dbConnection";
import userRouter from "./modules/subscription/subscription.router";

dotenv.config();

const app = express();
DbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
