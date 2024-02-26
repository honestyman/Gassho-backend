module.exports = (sequelize, Sequelize) => {
  const Tab = sequelize.define("tab", {
    name: {
      type: Sequelize.STRING,
    }
  });

  return Tab;
};
