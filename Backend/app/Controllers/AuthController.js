const User = require("../Models/User");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const isMatched = user.matchPasswords(password);

  if (!isMatched) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = user.getSignedToken();

  res.status(200).send({
    token,
  });
};

const register = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !password || !name) {
    res.status(422).json({ message: "All fields are required" });
  }

  await User.exists({ username }, async (err, exists) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
    }

    if (exists) {
      res.status(400).json({ message: "Username already taken" });
    }

    const user = await new User.create({ username, name, password });

    const token = user.getSignedToken();

    res.status(200).send({
      token,
    });
  });
};

module.exports = { login, register };
