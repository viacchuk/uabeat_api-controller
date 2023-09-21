const sequelize = require('./database.connector');
const {DataTypes } = require('sequelize');

const Object = sequelize.define('object', {
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, primaryKey: true, unique: true },
    info: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false }
})

const ObjectDev = sequelize.define('objectdev', {
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, primaryKey: true, unique: true },
    info: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false }
})

const Catalog = sequelize.define('catalog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CatalogDev = sequelize.define('catalogdev', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

ObjectDev.hasOne(CatalogDev);
CatalogDev.belongsTo(ObjectDev);

module.exports = {
    Object, ObjectDev, Catalog, CatalogDev
}