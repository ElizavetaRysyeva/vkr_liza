module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("order", {
    status: {
      type: Sequelize.INTEGER,
    },
    hotel_id: {
      type: Sequelize.INTEGER,
      references: sequelize.hotels,
    },
    room_id: {
      type: Sequelize.INTEGER,
      references: sequelize.rooms,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: sequelize.users,
    },
  });

  Model.statusEnum = [
    { val: 1, name: "В корзине" },
    { val: 2, name: "Оплачен" },
  ];

  return Model;
};
