/**
 * This model specifies the order using sequelize.
 */

// get the integer type in Sequelize
const SequelizeInteger = require("sequelize").INTEGER;

const sequelize = require("../util/database");

const Order = sequelize.define("order", {
    id: {
        type: SequelizeInteger, // id is an int
        autoIncrement: true, // each new order increments order
        allowNull: false, // must have value
        primaryKey: true, // id is the primary key
    },
});

module.exports = Order;
