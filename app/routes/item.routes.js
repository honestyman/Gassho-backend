const auth = require("../middleware/auth.js");

module.exports = app => {
  const items = require("../controllers/item.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', items.getItemAll);
  router.get('/sort', items.getSortItemAll);
  router.get('/tab', items.getTab);
  router.get('/getalltab', items.getAllTab);
  router.get('/getallcategory', items.getAllCategory);
  router.post('/like', items.addLike);
  router.get('/getlike', items.getLike);
  router.get('/getplay', items.getPlay);
  router.get('/getdownload', items.getDownload);
  router.post('/download', items.addDownload);
  router.post('/play', items.addPlays);
  router.get('/search', items.getContentSearch);
  router.get('/en_search', items.getEnContentSearch);
  router.get('/category_search', items.getCategorySearch);
  router.get('/tab_search', items.getTabSearch);

  // -------admin----------
  router.post('/additem_video', items.addItemVideo);
  router.post('/additem_sound', items.addItemSound);
  router.post('/updateitem_video', items.updateItemVideo);
  router.post('/updateitem_sound', items.updateItemSound);
  router.post('/addtab', items.addTab);
  router.get('/getoneitem', items.getOneItem);
  router.delete('/deleteoneitem', items.deleteOneItem);
  router.delete('/deletetag', items.deleteTag);
  router.get('/getalltags', items.getAllTags);
  router.get('/getonetag', items.getOneTag);
  router.post('/updatetag', items.updateTag);

  // router.get('/getcategory', items.getAllCategory);

  app.use("/api/items", router);
}