const Sequelize = require("sequelize");

// setup sequelize
// for now, this uses localhost so it won't work without having mysql installed
// it also uses a password which can be added directly here, or following the example in the .env.example file
const sequelize = new Sequelize(
    "node-shop",
    "root",
    `${process.env.PASSWORD}`, // if it's added to .env.example, this should be changed to process.env.example.PASSWORD
    //  or the .env.example file should be renamed like in the README
    {
        dialect: "mysql",
        host: "localhost",
    }
);

module.exports = sequelize;
