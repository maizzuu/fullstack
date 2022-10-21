const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    _id: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response
      .status(400)
      .json({ error: "username field cannot be empty" });
  }
  if (!password) {
    return response
      .status(400)
      .json({ error: "password field cannot be empty" });
  }
  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: "username must consist of at least 3 characters" });
  }
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must consist of at least 3 characters" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return response.status(400).json({
      error: "username is already taken",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    _id: 1,
  });
  console.log(user);
  response.json(user);
});

module.exports = usersRouter;
