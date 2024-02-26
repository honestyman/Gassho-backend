
module.exports = app => {
  const notification = require("../controllers/notification.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', notification.getAll);
  router.get('/getonenotification', notification.getOneNotification);
  router.post('/addnotification', notification.addNotification);

  // router.get('/sendnotification', notification.sendNotification);
  
  router.post('/updatenotification', notification.updateNotification);
  router.delete('/deleteone', notification.deleteOne);  


  app.use("/api/notifications", router);
}