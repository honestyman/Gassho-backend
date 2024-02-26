module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    plan: {
      type: Sequelize.STRING,
    },
    is_pay: {
      type:Sequelize.BOOLEAN,
    },
    deleted_date: {
      type:Sequelize.DATE,
    },
    dealine:{
      type:Sequelize.DATE
    },
    id_deleted:{
      type:Sequelize.BOOLEAN
    },
    country:{
      type:Sequelize.STRING,
    }
  });

  return User;
};
