const db = require('../models')
const moment = require('moment-timezone')
const { SimpleIntervalJob, Task, ToadScheduler } = require('toad-scheduler');
const scheduler = new ToadScheduler();
const axios = require('axios')
const OneSignal = require('onesignal-node');
var request = 	require('request');

const { ONE_SIGNAL_CONFIG }=require("../config/app.config");

const Notification = db.notification
const Op = db.Sequelize.Op

module.exports = () => {
  const task = new Task(
    'simple task', 
    async() => {
        //  let date = moment(new Date()).tz('America/Anchorage').format('YYYY-MM-DD');
        let date = moment(new Date()).tz('Asia/Tokyo').format();

        // let ank = datetime.toLocaleString('ja_JP', { timeZone: 'Asia/Tokyo' });
        var send_date=date.slice(0,10);
        var send_time=date.slice(11,16);
        const notification= await Notification.findAll({})
        if(notification){
          for(let i=0;i<notification.length;i++){
            if((notification[i].send_date == send_date) && (notification[i].send_time == send_time)){
              request(
                {
                  method:'POST',
                  uri:'https://onesignal.com/api/v1/notifications',
                  headers: {
                    "authorization": "Basic "+ONE_SIGNAL_CONFIG.API_KEY,
                    "content-type": "application/json; charset=utf-8"
                  },
                  json: true,
                  body:{
                    app_id:ONE_SIGNAL_CONFIG.APP_ID,
                    contents:{ en:"Click Here!"},
                    data: {
                      english: notification[i].englishtext,
                      japanese: notification[i].japanesetext
                    },
                    headings: { en: "Notification" },
                    included_segments:["All"],
                    content_available:true,
                    samll_icon:"ic_notification_icon",
                  }
                },
                function(error, response, body) {
                  if(!body.errors){
                     console.log(body);
                    // return res.json(body)
                  }else{
                     console.error('Error:', body.errors);
                    // return res.json(body.errors)
                  }
                }
              );
            }
          }
          // console.log(notifiaction);
        }else{
          console.log("Cannot Notification!")
        }
    });
  
  const job = new SimpleIntervalJob({ seconds: 60 }, task);
  
  scheduler.addSimpleIntervalJob(job);

}
