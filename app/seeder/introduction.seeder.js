const db = require('../models')

const Introduction = db.introduction
const Op = db.Sequelize.Op

module.exports = () => {
  Introduction.count().then((count) => {
    if (!count) {
      Introduction.create({
        id:"1",
        text: "友達または家族",
        en_text: "Friend/family"
      });
      Introduction.create({
        id:"2",
        text: "広告",
        en_text: "Advertisement"
      });
      Introduction.create({
        id:"3",
        text: "SNS（広告以外）",
        en_text: "Social media (non-advertisement content)"
      });
      Introduction.create({
        id:"4",
        text: "アプリストア",
        en_text: "App store"
      });
      Introduction.create({
        id:"5",
        text: "記事やブログ",
        en_text: "Articles, blogs"
      });
      Introduction.create({
        id:"6",
        text: "その他",
        en_text: "Others"
      });
    }else {
      console.log("Already inserted Introduction seed data");
      return;
    }
  })
}
