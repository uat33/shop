/**
 * This model specifies the cart using sequelize.
 */

// get the integer type in Sequelize
const SequelizeInteger = require("sequelize").INTEGER;

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
    id: {
        type: SequelizeInteger, // id is an integer
        autoIncrement: true, // increments by itself
        allowNull: false, // must have a value
        primaryKey: true, // is the primary key
    },
});

module.exports = Cart;
