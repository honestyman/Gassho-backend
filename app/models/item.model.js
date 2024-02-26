module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    japanesetitle: {
      type: Sequelize.STRING,
    },
    englishtitle: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    main_image_url: {
      type: Sequelize.STRING,
    },
    japanesedescription:{
      type: Sequelize.STRING,
    },
    englishdescription:{
      type: Sequelize.STRING,
    },
    filename:{
      type: Sequelize.STRING,
    },
    temple:{
      type: Sequelize.STRING,
    },
    order:{
      type: Sequelize.INTEGER,
    }
  });
  
  return Item;
};
