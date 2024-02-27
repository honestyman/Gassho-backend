const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const db = require('../models');
const Op = db.Sequelize.Op;
const User = db.user;

// @route       POST api/user
// @desc        Register a user
// @access      Public
router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a Passowrd with 6 or more charcters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }
    const { name, email, password, country } = req.body;
    try {
      let user = await User.findOne({ 
        where: {
          email: email
        }
      });
      if (user) {
        return res.status(400).json("User Already Exists");
      }

      user = {
        name: name,
        email: email,
        password: password,
        country: country
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user = await User.create(user);

      const payload = {
        user: {
          id: user.id,
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
      res.status(500).json("Server Error");
    }
  }
);

router.post('/changepassword',
   [
    check("email", "Please include a valid Email").isEmail(),
    check("presentPassword", "CurrentPassword is required").not().isEmpty(),
    check(
      "newPassword",
      "Please enter a NewPassowrd with 6 or more charcters"
    ).isLength({ min: 6 })
    ], 
    async (req,res)=>{
      console.log("======>",req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0].msg);
      }
      try {
        let user = await User.findOne({
          where:{
            email:req.body.email
          }
        });
        if(!user){
          return res.status(400).json("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(req.body.presentPassword, user.password);
        if(!isMatch){
          return res.status(400).json("Invalid Credentials");
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        user.save();
      return res.status(200).json("success");
      } catch (error) {
        res.status(500).send({msg: "Server Error"});
      }
    }
    );

    router.post('/editaccount',
    [
     check("email", "Please include a valid Email").isEmail(),
     check("newName", "name is required").not().isEmpty(),
     check("newEmail", "Please include a valid Newmail").isEmail()
     ], 
     async (req,res)=>{
       console.log("======>",req.body);
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json(errors.array()[0].msg );
       }
       try {
         let user = await User.findOne({
           where:{
             email:req.body.email
           }
         });
         let alluser = await User.findAll({});
         let flag=0;
         for(let i=0;i<alluser.length; i++){
          if(alluser[i].email==req.body.newEmail){
            flag=1;
            break;
          }
         }
         if(flag){
          return res.status(400).json("Email Already Exists");
         }else{
          user.name=req.body.newName;
          user.email=req.body.newEmail;
         }
         user.save();
      return res.status(200).json({message: "success"});
       } catch (error) {
       res.status(500).send({message: "Server Error"});
       }
     }
     );

module.exports = router;
