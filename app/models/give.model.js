module.exports = (sequelize, Sequelize) => {
  const Give = sequelize.define("give", {
    amount: {
      type: Sequelize.INTEGER,
    }
  });

  return Give;
};
