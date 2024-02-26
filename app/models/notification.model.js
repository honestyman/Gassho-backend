module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notifiaction", {
    japanesetext: {
      type: Sequelize.STRING,
    },
    englishtext: {
      type: Sequelize.STRING,
    },
    send_date: {
      type: Sequelize.STRING,
    },
    send_time: {
      type: Sequelize.STRING,
    }
  });

  return Notification;
};
