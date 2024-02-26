const express = require("express");
require('dotenv').config();
require('dotenv').config();
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error " });
  }
});

// @route       POST api/auth
// @desc        Auth user & get Token
// @access      Public
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return res.status(400).json("Invalid Credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json("Invalid Credentials");
      }
      if (user.id_deleted) {
        return res.status(400).json("Your account is already deleted!");
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send({ msg: "Server Error" });
    }
  }
);

router.post('/forget_password',
  [
    check("email", "Please include a valid Email").isEmail()
  ],
  async (req, res) => {
    //  console.log("======>",req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }
    try {
      let user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        return res.status(400).json("The email is incorrect.");
      }
      console.log(user);
      // var charSet = '0123456789';
      // var randomString = '';
      // for (var i = 0; i < 6; i++) {
      //     var randomPoz = Math.floor(Math.random() * charSet.length);
      //     randomString += charSet.substring(randomPoz,randomPoz+1);
      // }
      // console.log(randomString);
      // await User.update({ notification: req.body.notification }, {
      //   where: {
      //     email: req.body.email
      //   }
      // });
      // user.verifycode=randomString;
      // user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        }
      );

      try {
        const transpoter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        const mailContigrations = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Email Verification',
          text: `こんにちは。
                パスワードを変更するには、次のリンクをクリックしてください。
                http://localhost:3000/verify/${user.id}/${token}`
        };
  
        transpoter.sendMail(mailContigrations, function (error, info) {
          if (error) throw Error(error);
          console.log('Email Sent Successfully');
          config.log(info);
        });
        config.log("result:", transpoter);
      } catch (error) {
        console.log('mail sending error>>>', error);
      }

      return res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  }
);

router.post('/new_password',
  [
    check(
      "password",
      "Please enter a Passowrd with 6 or more charcters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // console.log("======>",req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }
    try {
      let user = await User.findOne({
        where: {
          id: req.body.id
        }
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.save();
      // console.log("============>", req.body);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  }
);


module.exports = router;
