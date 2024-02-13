/**
 * This model specifies the product using sequelize.
 */

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
    // all these fields must have values
    // id is the primary key for this table
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
