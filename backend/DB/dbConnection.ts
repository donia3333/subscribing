import mongoose from "mongoose";

export const DbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/Subscription")
    .then(() => {
      console.log(" dataBase Connected");
    })
    .catch((error) => {
      console.log("error in dataBase");
    });
};
