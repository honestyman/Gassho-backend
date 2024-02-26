const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const Introduction = db.introduction
// const CampaignGettingHistory = db.campaignGettingHistory
// const CampaignQueries = db.campaignQueries
// const CampaignInfo = db.campaignInfo
// const AdgroupInfo = db.adgroupInfo
// const AdInfo = db.adInfo
const User = db.user
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getIntroductionAll = (req, res) => {
  Introduction.findAll({
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

exports.getOneIntroduction = async (req, res) => {
  // console.log(req.query);
  const introduction = await Introduction.findOne({
    where: {
      id: req.query.id
    },
  })
    .then((data) => {
      // console.log("111====", data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

exports.addIntroduction = async (req, res) => {
  console.log(req.body);
  try {
    const introduction = await Introduction.create({
      text: req.body.textIntroduction,
      en_text: req.body.entextIntroduction,
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateIntroduction = async (req, res) => {
  // console.log("111", req.body); 
  try {
    const introduction = await Introduction.findOne({
      where: {
        id: req.body.id
      },
    });
    introduction.text=req.body.textIntroduction;
    introduction.en_text=req.body.entextIntroduction;
    introduction.save();  
    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.deleteOneItem = async (req, res) => {
  // console.log("111", req.query.id);
  try {
    const introduction = await Introduction.findOne({
      where: {
        id: req.query.id
      },
      order:[['id','DESC']],
    });
    introduction.destroy();

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}