const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const UserModel = require("../model/user.js");

class AuthController {
  static async register(req, res) {
    try {
      let { name, password } = req.body;

      if (!name || !password)
        return res.status(400).json({ msg: "Ism va parolni kiriting !" });

      let user = await UserModel.findOne({ name });
      if (user)
        return res
          .status(400)
          .json({ msg: "Bu user allaqachon ro`yxatdan o`tgan" });

      let salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      user = await UserModel.create({
        name,
        password,
      });

      const token = jwt.sign({ _id: user._id }, "jamshid", { expiresIn: "1d" });

      return res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error !" });
    }
  }

  static async login(req, res) {
    try {
      let { name, password } = req.body;

      if (!name || !password)
        return res.status(400).json({ msg: "Ism va parolni kiriting !" });

      let user = await UserModel.findOne({ name });
      if (!user) return res.status(400).json({ msg: "Bu user tizimda yo`q" });

      password = bcrypt.compareSync(password, user.password);
      if (!password)
        return res.status(400).json({ msg: "Parol xato kiritilgan !" });

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "jamshid",
        { expiresIn: "1d" }
      );

      return res
        .status(200)
        .json({ user: { _id: user._id, name: user.name }, token });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error !" });
    }
  }
  static async userme(req, res) {
    try {
      let token = req.headers.authorization;

      if (!token) return res.status(401).json({ msg: "Tizimga ruhsat yoq !" });

      try {
        token = jwt.verify(token, "jamshid");
        let user = await UserModel.findById(token._id).select("name");

        return res.status(200).json({ user });
      } catch (err) {
        res.status(401).json({ msg: "Tizimga ruhsat yoq !" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Server Error !" });
    }
  }
}

module.exports = AuthController;
