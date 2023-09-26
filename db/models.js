const sequelize = require('./database.connector');
const {DataTypes } = require('sequelize');

const Object = sequelize.define('object', {
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, primaryKey: true, unique: true },
    info: { type: DataTypes.TEXT, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false }
})

module.exports = {
    Object
}