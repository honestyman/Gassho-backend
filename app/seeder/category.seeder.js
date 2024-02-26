const db = require('../models')

const Category = db.category
const Op = db.Sequelize.Op

module.exports = () => {
  Category.count().then((count) => {
    if (!count) {
      Category.create({
        id:"1",
        name: "紹介",
        en_name: "Intro",
        image_name: "1.png"
      });
      Category.create({
        id:"2",
        name: "瞑想",
        en_name: "Meditation",
        image_name: "2.png"
      });
      Category.create({
        id:"3",
        name: "リラックス＆睡眠",
        en_name: "Relax & Sleep",
        image_name: "3.png"
      });
      Category.create({
        id:"4",
        name: "智慧",
        en_name: "Wisdom",
        image_name: "4.png"
      });
      Category.create({
        id:"5",
        name: "ご利益",
        en_name: "Blessing",
        image_name: "5.png"
      });
      Category.create({
        id:"6",
        name: "雑談",
        en_name: "Talk",
        image_name: "6.png"
      });
      
    }else {
      console.log("Already inserted seed data");
      return;
    }
  })
}
