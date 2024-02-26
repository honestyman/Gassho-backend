const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const OneSignal = require('onesignal-node');
const { ONE_SIGNAL_CONFIG }=require("../config/app.config");

const Notification = db.notification

const Op = db.Sequelize.Op
const Sequelize = db.Sequelize
var request = 	require('request');

// Retrieve all campaigns
exports.getAll = (req, res) => {
  Notification.findAll({
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

exports.getOneNotification = async (req, res) => {
  // console.log(req.query);
  const notifiaction = await Notification.findOne({
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

exports.addNotification = async (req, res) => {
  // console.log(req.body);  
  
  try {
    const notification = await Notification.create({
      japanesetext: req.body.japanesetext,
      englishtext: req.body.englishtext,
      send_date:req.body.senddate,
      send_time:req.body.sendtime
    });
    
    return res.status(200).json("success")

  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateNotification = async (req, res) => {
  // console.log("111", req.body); 
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.body.id
      },
    });
    notification.japanesetext=req.body.japanesetext;
    notification.englishtext=req.body.englishtext;
    notification.send_date=req.body.senddate;
    notification.send_time=req.body.sendtime;
    notification.save();  
    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.deleteOne = async (req, res) => {
  // console.log("111", req.query.id);
  try {
    const notifiaction = await Notification.findOne({
      where: {
        id: req.query.id
      },
      order:[['id','DESC']],
    });
    notifiaction.destroy();

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

// exports.sendNotification = async (req, res, next) => {
  
//   request(
// 		{
// 			method:'POST',
// 			uri:'https://onesignal.com/api/v1/notifications',
// 			headers: {
// 				"authorization": "Basic "+ONE_SIGNAL_CONFIG.API_KEY,
// 				"content-type": "application/json; charset=utf-8"
// 			},
// 			json: true,
// 			body:{
// 				app_id:ONE_SIGNAL_CONFIG.APP_ID,
//         contents:{ en:"Test Push Notification"},
//         data: {
//           english: 'test notification',
//           japanese: 'テスト通知'
//         },
//         headings: { en: "Notification" },
//         included_segments:["All"],
//         content_available:true,
//         samll_icon:"ic_notification_icon",
//         // data:{
//         //   PushTitle:"CUSTOM NOTIFICATION"
//         // }
// 			}
// 		},
// 		function(error, response, body) {
// 			if(!body.errors){
// 				// console.log(body);
//         return res.json(body)
// 			}else{
// 				// console.error('Error:', body.errors);
//         return res.json(body.errors)
// 			}
			
// 		}
// 	);

// }
