module.exports = (sequelize, Sequelize) => {
  const StateHistory = sequelize.define("statehistory", {
    status:{
      type:Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
    }
  });

  return StateHistory;
};
