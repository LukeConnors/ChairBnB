'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(
        models.Image,
        {foreignKey: 'imageableId', constraints: false, scope: {imageableType: 'Review'}}
      )

      Review.belongsTo(
        models.Spot,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      )

      Review.belongsTo(
        models.User,
        {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true}
      )
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      },
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
