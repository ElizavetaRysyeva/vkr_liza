module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("room", {
        category: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        max_count: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            references: sequelize.hotels,
        }
    });

    return Model;
};
