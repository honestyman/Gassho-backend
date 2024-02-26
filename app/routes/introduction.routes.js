const auth = require("../middleware/auth.js");

module.exports = app => {
  const introductions = require("../controllers/introduction.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', introductions.getIntroductionAll);
  router.get('/getoneintroduction', introductions.getOneIntroduction);
  router.post('/updateintroduction', introductions.updateIntroduction);
  
  router.post('/add', introductions.addIntroduction);
  router.delete('/delete', introductions.deleteOneItem);  


  app.use("/api/introductions", router);
}