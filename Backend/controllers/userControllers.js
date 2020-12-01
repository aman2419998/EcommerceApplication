import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Users from "../models/userModel.js";

// @desc User Authentication and Token
// @route POST /api/users/login
// @access public

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid Email or Password`);
  }
});

// @desc GET user Profile
// @route GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(402);
    throw new Error("User not found");
  }
});

// @desc Update user Profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(402);
    throw new Error("User not found");
  }
});

// @desc POST register User
// @route POST /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await Users.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error(`User already exists`);
  } else {
    const newUser = await Users.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc GET users
// @route GET /api/users
// @access private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

// @desc DELETE users
// @route DELETE /api/users/:id
// @access private/Admin

const deleteUsers = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "Successfully Deleted!" });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// @desc GET users by id
// @route GET /api/users/:id
// @access private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// @desc GET users by id (For Order Detail)
// @route GET /api/users/test/:id
// @access private

const getUserByIdOrder = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    } else {
      if (req.body.isAdmin === false) {
        user.isAdmin = false;
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserByIdOrder,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
};
