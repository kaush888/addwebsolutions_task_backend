'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tbl_student extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
        }
    };
    tbl_student.init({
        iStudentID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        vFirstName: DataTypes.STRING,
        vLastName: DataTypes.STRING,
        vFatherName: DataTypes.STRING,
        vEmail: DataTypes.STRING,
        tAddress: DataTypes.TEXT,
        vMobileNo: DataTypes.STRING,
        vGender: DataTypes.STRING,
        dDOB: DataTypes.DATEONLY,
        vCountry: DataTypes.STRING,
        vPassword: DataTypes.STRING,
        isDeleted: {
            type: DataTypes.INTEGER,  // ('0','1')
            defaultValue: 0
        },
        dtCreatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        dtUpdatedAt: DataTypes.DATE,
        dtDeletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'tbl_student',
        timestamps: false
    });
    return tbl_student;
};