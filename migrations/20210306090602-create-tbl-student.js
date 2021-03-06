'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tbl_students', {
            iStudentID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            vFirstName: Sequelize.STRING,
            vLastName: Sequelize.STRING,
            vFatherName: Sequelize.STRING,
            vEmail: Sequelize.STRING,
            tAddress: Sequelize.TEXT,
            vMobileNo: Sequelize.STRING,
            vGender: Sequelize.STRING,
            dDOB: Sequelize.DATEONLY,
            vCountry: Sequelize.STRING,
            vPassword: Sequelize.STRING,
            isDeleted: {
                type: Sequelize.INTEGER,  // ('0','1')
                allowNull: false,
                defaultValue: 0
            },
            dtCreatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            dtUpdatedAt: {
                type: Sequelize.DATE,
            },
            dtDeletedAt: {
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tbl_students');
    }
};