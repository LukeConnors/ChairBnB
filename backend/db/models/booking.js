'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId', onDelete:'CASCADE', hooks: true}
      )

      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true}
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    startDate:
    {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    endDate: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false,
      validate: {
        isDate: true,
      }
    }

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
