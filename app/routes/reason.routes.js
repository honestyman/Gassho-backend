
module.exports = app => {
  const reasons = require("../controllers/reason.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', reasons.getReasonAll);

  router.post('/user_reasons/add', reasons.addUserReason);

//  ---------admin-------
  router.post('/updatereason', reasons.updateReason);
  router.post('/add', reasons.addReason);
  router.get('/getonereason', reasons.getOneReason);
  router.delete('/delete', reasons.deleteOneItem);

  app.use("/api/reasons", router);
}