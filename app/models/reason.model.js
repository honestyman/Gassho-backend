module.exports = (sequelize, Sequelize) => {
  const Reason = sequelize.define("reason", {
    text: {
      type: Sequelize.STRING,
    },
    en_text: {
      type: Sequelize.STRING,
    }
  });

  return Reason;
};
