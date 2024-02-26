const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const Reason = db.reason
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
exports.getReasonAll = (req, res) => {
  Reason.findAll({
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
exports.addUserReason=async(req, res)=>{
  let len=JSON.parse( req.body.reasons).length;
  let len1=JSON.parse( req.body.introductions).length;
   const resultReason=[];
   const user=await User.findOne({
            where: {
                email: req.body.email
              },
              order: [['email', 'DESC']],
            });
    for(let i=0;i<len;i++){
      resultReason[i]=await Reason.findOne({
        where: {
          text: JSON.parse( req.body.reasons)[i]
        },
        order: [['text', 'DESC']],
      });
      // console.log(result[i]);
      await user.addReason(resultReason[i], {through: { selfGranted: false }});
    }
    const resultIntroduction=[];
    for(let i=0;i<len1;i++){
      resultIntroduction[i]=await Introduction.findOne({
            where: {
                text: JSON.parse( req.body.introductions)[i]
              },
              order: [['text', 'DESC']],
            });
      // console.log(result[i]);
      await user.addIntroduction(resultIntroduction[i], {through: { selfGranted: false }});
    }
}

exports.getOneReason = async (req, res) => {
  // console.log(req.query);
  const reason = await Reason.findOne({
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

exports.updateReason = async (req, res) => {
  // console.log("111", req.body); 
  try {
    const reason = await Reason.findOne({
      where: {
        id: req.body.id
      },
    });
    reason.text=req.body.textReason;
    reason.en_text=req.body.entextReason;
    reason.save();  
    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addReason = async (req, res) => {
  console.log(req.body);
  try {
    const reason = await Reason.create({
      text: req.body.textReason,
      en_text: req.body.entextReason,
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.deleteOneItem = async (req, res) => {
  // console.log("111", req.query.id);
  try {
    const reason = await Reason.findOne({
      where: {
        id: req.query.id
      },
      order:[['id','DESC']],
    });
    reason.destroy();

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}