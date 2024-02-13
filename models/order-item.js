/**
 * This model specifies the order-item using sequelize.
 */

// get the integer type in Sequelize
const SequelizeInteger = require("sequelize").INTEGER;

const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: SequelizeInteger,
        autoIncrement: true, // automatically increments
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = OrderItem;
