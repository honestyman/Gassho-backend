const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.js");

module.exports = app => {
  const users = require("../controllers/users.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/getall', users.getAll);

  router.get('/getall_subscription', users.getAllSub);
  router.get('/getgivelist', users.getAllGiveList);

  router.get('/getone_reason', users.getOneReason);
  router.get('/getone_introduction', users.getOneIntroduction);
  router.get('/getstatus', users.getStatus);
  router.get('/get_tiping', users.getTiping);
  router.get('/getname', users.getName);
  router.post('/plan', users.addPlan);
  router.post('/notification', users.setNotification);
  router.post('/verify', users.emailVerify);

  router.delete('/delete', users.accountDelete);
  router.delete('/onlydelete', users.accountOnlyDelete);

  app.use("/api/users", router);
}