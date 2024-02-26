const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { query } = require('express-validator')
const Item = db.item
const Tab = db.tab
const Like = db.like
const Download = db.download
const Play = db.play
const User = db.user
const Category = db.category
// const CampaignGettingHistory = db.campaignGettingHistory
// const CampaignQueries = db.campaignQueries
// const CampaignInfo = db.campaignInfo
// const AdgroupInfo = db.adgroupInfo
// const AdInfo = db.adInfo
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getItemAll = async (req, res) => {
  const item = await Item.findAll({
    include: Tab
    // order: [['recId', 'ASC']],
    // group: "campaignId",
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

exports.getSortItemAll = async (req, res) => {
  try {
    const result=[];
    const item = await Item.findAll({
      include : Tab
    });
    console.log(item)
    if(item){
      for(let i=0;i<item.length;i++){
        result[i]=item[i];
      }
      for(let i=0;i<result.length;i++){
        for(let j=i+1;j<result.length;j++){
          if(result[i].order > result[j].order){
            var val=result[i];
            result[i]=result[j];
            result[j]=val;
          }
        }
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getLike = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.query.email
      }
    })
    const like = await Like.findAll({
      where: {
        userId: user.id
      }
    })
    const result = []
    for (let i = 0; i < like.length; i++) {
      // console.log(like[i].itemId)
      const item = await Item.findOne({
        where: {
          id: like[i].itemId
        }
      })
      // console.log("--------",item);
      result[i] = item
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getPlay = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.query.email
      }
    })
    const play = await Play.findAll({
      where: {
        userId: user.id
      }
    })
    // console.log("=======>", like);
    const result = []
    for (let i = 0; i < play.length; i++) {
      // console.log(like[i].itemId)
      const item = await Item.findOne({
        where: {
          id: play[i].itemId
        }
      })
      result[i] = item
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getDownload = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.query.email
      }
    })
    const download = await Download.findAll({
      where: {
        userId: user.id
      }
    })
    // console.log("=======>", like);
    const result = []
    for (let i = 0; i < download.length; i++) {
      // console.log(like[i].itemId)
      const item = await Item.findOne({
        where: {
          id: download[i].itemId
        }
      })
      result[i] = item
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getTab = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.query.id },
      include: Tab
    })
    var len = item.tabs.length;
    var result = [];
    for (let i = 0; i < len; i++) {
      result[i] = item.tabs[i]
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getAllTab = async (req, res) => {

  try {
    const tab = await Tab.findAll({
    })
    return res.status(200).json(tab)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
  // console.log('tabs>>', item.tabs);
}

exports.getAllCategory = async (req, res) => {

  try {
    const category = await Category.findAll({
    })
    return res.status(200).json(category)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addLike = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      order: [['email', 'DESC']],
    });
    const [like, created] = await Like.findOrCreate({
      where: {
        userId: user.id,
        itemId: req.body.itemID
      },
      defaults: {
        userId: user.id,
        itemId: req.body.itemID
      }
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addDownload = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      order: [['email', 'DESC']],
    });
    const [download, created] = await Download.findOrCreate({
      where: {
        userId: user.id,
        itemId: req.body.itemID
      },
      defaults: {
        userId: user.id,
        itemId: req.body.itemID
      }
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addPlays = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      order: [['email', 'DESC']],
    });
    const [play, created] = await Play.findOrCreate({
      where: {
        userId: user.id,
        itemId: req.body.itemID
      },
      defaults: {
        userId: user.id,
        itemId: req.body.itemID
      }
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getContentSearch = async (req, res) => {
  // console.log("=======>", req.query.content);
  try {
    const item = await Item.findAll({})
    const result = [];
    let j = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].japanesetitle.includes(req.query.content) || item[i].japanesedescription.includes(req.query.content)) {
        result[j] = item[i];
        j++;
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getEnContentSearch = async (req, res) => {
  // console.log("=======>", req.query.content);
  try {
    const item = await Item.findAll({})
    const result = [];
    let j = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].englishtitle.includes(req.query.content) || item[i].englishdescription.includes(req.query.content)) {
        result[j] = item[i];
        j++;
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getCategorySearch = async (req, res) => {
  // console.log("=======>", req.query.content);
  try {
    const item = await Item.findAll({})
    const result = [];
    let j = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].categoryId == req.query.id) {
        result[j] = item[i];
        j++;
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getTabSearch = async (req, res) => {
  console.log("=======>", req.query.id);
  try {
    const tab = await Tab.findOne({
      where: { id: req.query.id },
      include: Item
    })
    const item = await Item.findAll({})
    const result = [];
    for (let i = 0; i < tab.items.length; i++) {
      result[i] = tab.items[i];
    }
    return res.status(200).json(result)
  }
  catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

// -----------------admin-------------

exports.addItemVideo = async (req, res) => {
  console.log(req.body);
  try {
    const category = await Category.findOne({
      where: { name: req.body.category }
    })
    const filename=req.body.vimeourl.split("/");
    var len=filename.length;
    const item = await Item.create({
      temple:req.body.temple,
      japanesetitle: req.body.japanesetitle,
      englishtitle: req.body.englishtitle,
      time: req.body.time,
      order:req.body.order,
      type: "動画",
      filename: filename[len-1],
      main_image_url: '/img/'+req.body.filename,
      categoryId: category.id,
      japanesedescription: req.body.japanesedescription,
      englishdescription: req.body.englishdescription
    });
    const tab = [];
    for (let i = 0; i < req.body.tags.length; i++) {
      tab[i] = await Tab.findOne({
        where: { name: req.body.tags[i] },
        order: [['name', 'DESC']],
      });
      await item.addTab(tab[i], { through: { selfGranted: false } });
    }
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addItemSound = async (req, res) => {
  console.log(req.body);
  try {
    const category = await Category.findOne({
      where: { name: req.body.category }
    })
    const item = await Item.create({
      temple:req.body.temple,
      japanesetitle: req.body.japanesetitle,
      englishtitle: req.body.englishtitle,
      time: req.body.time,
      order:req.body.order,
      type: "音声",
      filename: req.body.soundname,
      main_image_url: '/img/'+req.body.filename,
      categoryId: category.id,
      japanesedescription: req.body.japanesedescription,
      englishdescription: req.body.englishdescription
    });
    const tab = [];
    for (let i = 0; i < req.body.tags.length; i++) {
      tab[i] = await Tab.findOne({
        where: { name: req.body.tags[i] },
        order: [['name', 'DESC']],
      });
      await item.addTab(tab[i], { through: { selfGranted: false } });
    }
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getAllTags = async (req, res) => {
  try {
    
    var result = [];
    const tab = await Tab.findAll({});
    for(let i=0;i<tab.length;i++){
      result[i]=tab[i].name
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateItemVideo = async (req, res) => {
  console.log("111", req.body);
  try {
    console.log(req.body.tags.length)
    const item = await Item.findOne({
      where: {
        id: req.body.id
      },
      include: Tab
    })
    console.log("====>", item.tabs);
    const category = await Category.findOne({
      where: { name: req.body.category },
    })
    const filename=req.body.vimeourl.split("/");
    var len=filename.length;
    if (item) {
      item.japanesetitle = req.body.japanesetitle;
      item.englishdescription = req.body.englishdescription;
      item.time = req.body.time;
      item.temple = req.body.temple;
      item.order = req.body.order;
      item.filename = filename[len-1];
      item.categoryId = category.id;
      item.japanesedescription = req.body.japanesedescription;
      item.englishdescription = req.body.englishdescription;
      const tab = []
      for (let i = 0; i < item.tabs.length; i++) {
        tab[i] = await Tab.findOne({
          where: { name: item.tabs[i].name },
          order: [['name', 'DESC']],
        });
        await item.removeTab(([tab[i].id]))
      }
    }
    if(req.body.filename){
      item.main_image_url = '/img/'+req.body.filename;
    }
    item.save();

    const tab = [];
    for (let i = 0; i < req.body.tags.length; i++) {
      tab[i] = await Tab.findOne({
        where: { name: req.body.tags[i] },
        order: [['name', 'DESC']],
      });
      // // await item.removeTab(([tab[i].id]))
      await item.addTab(tab[i], { through: { selfGranted: false } });
      // await item.updateTab(tab[i], {through: { selfGranted: false }});   
    }

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateItemSound = async (req, res) => {
  console.log("222", req.body);
  try {
    const item = await Item.findOne({
      where: {
        id: req.body.id
      },
      include: Tab
    })
    console.log("====>", item.tabs);
    const category = await Category.findOne({
      where: { name: req.body.category },
    })

    if (item) {
      item.japanesetitle = req.body.japanesetitle;
      item.englishdescription = req.body.englishdescription;
      item.time = req.body.time;
      item.temple = req.body.temple;
      item.order = req.body.order;
      item.categoryId = category.id;
      item.japanesedescription = req.body.japanesedescription;
      item.englishdescription = req.body.englishdescription;
      const tab = []
      for (let i = 0; i < item.tabs.length; i++) {
        tab[i] = await Tab.findOne({
          where: { name: item.tabs[i].name },
          order: [['name', 'DESC']],
        });
        await item.removeTab(([tab[i].id]))
      }
    }
    if(req.body.filename){
      item.main_image_url = '/img/'+req.body.filename;
    }
    if(req.body.soundname){
      item.filename = req.body.soundname;
    }
    item.save();

    const tab = [];
    for (let i = 0; i < req.body.tags.length; i++) {
      tab[i] = await Tab.findOne({
        where: { name: req.body.tags[i] },
        order: [['name', 'DESC']],
      });
      // // await item.removeTab(([tab[i].id]))
      await item.addTab(tab[i], { through: { selfGranted: false } });
      // await item.updateTab(tab[i], {through: { selfGranted: false }});   
    }

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.deleteOneItem = async (req, res) => {
  try {
    const item_tab = await Item.findOne({
      where: {
        id: req.query.id
      },
      include: Tab
    });
    const tab=[]
    for (let i = 0; i < item_tab.tabs.length; i++) {
      tab[i] = await Tab.findOne({
        where: { name: item_tab.tabs[i].name },
        order: [['name', 'DESC']],
      });
      await item_tab.removeTab(([tab[i].id]))
    }
    const item = await Item.findOne({
      where: {
        id: req.query.id
      },
      order:[['id','DESC']],
    });
    item.destroy();

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getOneItem = async (req, res) => {
  console.log(req.query);
  const item = await Item.findOne({
    where: {
      id: req.query.id
    },
    include: Tab
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

exports.getOneTag = async (req, res) => {
  console.log(req.query);
  const tab = await Tab.findOne({
    where: {
      id: req.query.id
    }
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

exports.addTab = async (req, res) => {
  console.log("==",req.body);
  try {
    const tab = await Tab.create({
      name:req.body.name
    });
    
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateTag = async (req, res) => {
  console.log("222", req.body);
  try {
    const tab = await Tab.findOne({
      where: {
        id: req.body.id
      }
    })
    if(tab){
      tab.name=req.body.name
    }
    tab.save();    
    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.deleteTag = async (req, res) => {
  console.log(req.query);
  try {
    const tab = await Tab.findOne({
      where: {
        id: req.query.id
      }
    });
    tab.destroy();

    return res.status(200).json("Success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}