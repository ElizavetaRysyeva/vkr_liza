module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("hotel", {
        name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        stars: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
    });

    return Model;
};
