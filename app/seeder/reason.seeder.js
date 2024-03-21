const db = require('../models')

const Reason = db.reason
const Op = db.Sequelize.Op

module.exports = () => {
  Reason.count().then((count) => {
    if (!count) {
      Reason.create({
        id:"1",
        text: "仏教の瞑想に興味がある",
        en_text: "Interested in Buddhist-style meditation"
      });
      Reason.create({
        id:"2",
        text: "リラックスができるようになりたい",
        en_text: "I would like to be able to relax"
      });
      Reason.create({
        id:"3",
        text: "睡眠の導入に良さそうと思った",
        en_text: "It is good for sleep"
      });
      Reason.create({
        id:"4",
        text: "メンタルヘルスに良さそうだと思った",
        en_text: "I felt it looks good for mental health"
      });
      Reason.create({
        id:"5",
        text: "著名なお寺の僧侶から人生で 役立ちそうな話を聞きたい",
        en_text: "I would like to hear life tips from monks in famous Buddhist temples"
      });
      Reason.create({
        id:"6",
        text: "お経等を聞くことでご利益が欲しい",
        en_text: "I would like to listen to sutras to increase my overall happiness"
      });
      Reason.create({
        id:"7",
        text: "著名なお寺の僧侶の考え方・人柄に興味がある",
        en_text: "I am interested to know the personalities of monks in famous Buddhist temples"
      });
      Reason.create({
        id:"8",
        text: "その他",
        en_text: "Others"
      });
    }else {
      console.log("Already inserted Reason seed data");
      return;
    }
  })
}
