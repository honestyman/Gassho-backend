module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
    },
    en_name: {
      type: Sequelize.STRING,
    },
    image_name: {
      type: Sequelize.STRING,
    }
  });

  return Category;
};
