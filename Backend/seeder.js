import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import user from "./data/users.js";
import products from "./data/product.js";
import connectDB from "./config/connectDB.js";
import Users from "./models/userModel.js";
import Products from "./models/productModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Users.deleteMany();
    await Products.deleteMany();

    const SampleUsers = await Users.insertMany(user);

    const AdminId = SampleUsers[0]._id;

    const SampleProducts = products.map((p) => {
      return { ...p, user: AdminId };
    });

    await Products.insertMany(SampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`Error : ${error}`.red.inverse);
    process.exit(1);
  }
};

const DestroyData = async () => {
  try {
    await Users.deleteMany();
    await Products.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`Error : ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  DestroyData();
} else {
  importData();
}
