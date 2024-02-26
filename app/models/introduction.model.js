module.exports = (sequelize, Sequelize) => {
  const Introduction = sequelize.define("introduction", {
    text: {
      type: Sequelize.STRING,
    },
    en_text: {
      type: Sequelize.STRING,
    }
  });

  return Introduction;
};
