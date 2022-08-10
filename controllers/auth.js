const User = require("../models/user");

exports.currentUser = async (req, res) => {
  const { email } = req.user;
  User.findOne({ email }).exec((error, user) => {
    if (error) throw new Error(error);
    res.json(user);
  });
};

exports.createOrUpdateUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { name }, { new: true });

  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: name ? name : email?.split("@")[0],
    }).save();
    res.json(newUser);
  }
};
