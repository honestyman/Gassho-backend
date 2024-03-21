const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { check, validationResult } = require("express-validator");
const User = db.user
const Reason= db.reason
const Introduction= db.introduction
const Like=db.like
const Play=db.play
const Download=db.download
const StateHistory=db.statehistory
const Give=db.give
const Item=db.item
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns

exports.addPlan=async(req, res)=>{
  try {
    var email=JSON.parse(req.body.email);
    var plan=JSON.parse(req.body.plan);
    const user=await User.update({ plan: plan[0] }, {
      where: {
        email: email
      }
    }); 
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}
exports.setNotification=async(req, res)=>{
  console.log(req.body);
  try {
    const user=await User.update({ notification: req.body.notification }, {
      where: {
        email: req.body.email
      }
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}
exports.accountDelete=async(req, res)=>{
  console.log(req.query);
  try {
    const user=await User.findOne({
      where: {
          email: req.query.email
        },
        order: [['email', 'DESC']],
      });

    const user_reasons=await User.findOne({
      where:{
        email:req.query.email
      },
      include: Reason
    });
    const reason=[];
    for(let i=0;i<user_reasons.reasons.length;i++){
      reason[i]=await Reason.findOne({
        where:{
          id:user_reasons.reasons[i].id
        },
        order:[['id','DESC']],
      });
      await user_reasons.removeReason(([reason[i]]))
    }
    const user_introductions=await User.findOne({
      where:{
        email:req.query.email
      },
      include: Introduction
    });
    console.log("-------",user_introductions.introductions.length);
    const introduction=[];
    for(let i=0;i<user_introductions.introductions.length;i++){
      introduction[i]=await Introduction.findOne({
        where:{
          id:user_introductions.introductions[i].id
        },
        order:[['id','DESC']],
      });
      await user_introductions.removeIntroduction(([introduction[i]]))
    }
    const user_likes=await Like.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_likes.length;i++){
      user_likes[i].destroy();
    }

    const user_plays=await Play.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_plays.length;i++){
      user_plays[i].destroy();
    }

    const user_downloads=await Download.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_downloads.length;i++){
      user_downloads[i].destroy();
    }
     user.destroy();
    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.accountOnlyDelete=async(req, res)=>{
  console.log(req.query);
  try {
    const user=await User.findOne({
      where: {
          email: req.query.email
        },
        order: [['email', 'DESC']],
      });
    const user_likes=await Like.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_likes.length;i++){
      user_likes[i].destroy();
    }

    const user_plays=await Play.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_plays.length;i++){
      user_plays[i].destroy();
    }

    const user_downloads=await Download.findAll({
      where:{
        userId:user.id
      }
    });
    for(let i=0;i<user_downloads.length;i++){
      user_downloads[i].destroy();
    }
    user.id_deleted=true
    user.save()
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.emailVerify=async(req, res)=>{
  console.log(req.body);
  try {
    const user = await User.findOne({
      where:{
        email:req.body.email
      }
    });
    if(user.verifycode!=req.body.verifycode){
      return res.status(400).json("The Verification code is incorrect.");
    }
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

// --------------admin--------------
exports.getAll = async (req, res) => {
  const users = await User.findAll({
    // order: [['recId', 'ASC']],
    // group: "campaignId",
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

exports.getOneReason = async (req, res) => {
  try {
    // console.log(req.query.id)
    var user = await User.findOne({
      where:{
        id:req.query.id
      },
      include:Reason,
    });
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getOneIntroduction = async (req, res) => {
  try {
    // console.log(req.query.id)
    var user = await User.findOne({
      where:{
        id:req.query.id
      },
      include:Introduction,
    });
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getStatus = async (req, res) => {
  try {
    // console.log(req.query.id)
    var statehistory = await StateHistory.findAll({
      where:{
        userId:req.query.id
      }
    });
    // console.log(statehistory)
    return res.status(200).json(statehistory)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getTiping = async (req, res) => {
  try {
    // console.log(req.query.id)
    var give = await Give.findAll({
      where:{
        userId:req.query.id
      },
      include:Item
    });
    // console.log(give)
    return res.status(200).json(give)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getName = async (req, res) => {
  try {
    // console.log(req.query.id)
    var user = await User.findOne({
      where:{
        email:req.query.email
      }
    });
    //  console.log(user)
    return res.status(200).json(user.name)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getAllSub = async (req, res) => {
  try {
    // console.log(req.query.id)
    const result = [];
    const payment = [];
    const users = await User.findAll({});
    for(let i = 0 ; i < users.length ; i ++){
      if(users[i].plan){
       const user = await StateHistory.findOne({
        where:{
          userId:users[i].id,
          status:users[i].plan
        }
       });
       if(user){
        payment[i]=user
       }else{
        payment[i]= null
       }
      }else{
        payment[i]= null
      }
    }
    for(let i=0;i<users.length;i++){
      result[i]={
        id:users[i].id,
        name:users[i].name,
        email:users[i].email,
        payment:payment[i]
      }
    }
    // console.log(give)
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getAllGiveList = async (req, res) => {
  try {
    // console.log(req.query.id)
    const result=[];
    const gives=await Give.findAll({});
    if(gives){
      for(let i=0;i<gives.length;i++){
        const user=await User.findOne({
          where:{
            id:gives[i].userId
          }
        });
        console.log(user);
        const item=await Item.findOne({
          where:{
            id:gives[i].itemId
          }
        });
        result[i]={
          userId:gives[i].userId,
          name:user.name,
          email:user.email,
          contentId:gives[i].itemId,
          temple:item.temple,
          amount:gives[i].amount,
          paymentdate:gives[i].createdAt
        }
      }
    }
    // return res.status(200).json('result')
     return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}