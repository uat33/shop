/**
 * This model specifies the user using sequelize.
 */

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    // also have name and email fields which are strings
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

module.exports = User;
