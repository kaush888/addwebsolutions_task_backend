const jwt = require('jwt-simple');
const bcrypt = require("bcrypt");
const { StudentController } = require('./studentController');

const studentModel = require('../../models').tbl_student;

const status = require('../../config/statuscode').status;
const constants = require('../../config/constants');


class AuthController extends StudentController {
    
    constructor() {
        super();
    }
    
    /* Register as Student */
    async registerStudent(req, res) {
        try {
            let student = await studentModel
            .findOne({
                where: {
                    vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                    isDeleted: 0
                }
            })
            
            if (student) {
                return res.json({
                    status: status.conflict_code,
                    message: "Email is already registered. Please try another one.",
                    success: false
                });
            } else {
                if (req.body.vPassword) {
                    bcrypt.hash(req.body.vPassword, 10, (err, hash) => {
                        if (err) {
                            console.log("🚀 ~ file: authController.js ~ line 37 ~ AuthController ~ bcrypt.hash ~ err", err)
                            return res.json({
                                status: status.internal_server_error_code,
                                message: "Something went wrong",
                                success: false,
                            });
                        } else {
                            let vHashedPassword = hash;
                            
                            studentModel.create({
                                vFirstName : req.body.vFirstName,
                                vLastName : req.body.vLastName,
                                vFatherName : req.body.vFatherName,
                                vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                                tAddress : req.body.tAddress,
                                vMobileNo : req.body.vMobileNo,
                                vGender : req.body.vGender,
                                dDOB : req.body.dDOB,
                                vCountry : req.body.vCountry,
                                vPassword : vHashedPassword,
                                dtCreatedAt: new Date(),
                            }).then(async (studentData) => {
                                return res.json({
                                    status: status.success_code,
                                    message: "Student has been successfully registered",
                                    success: true,
                                    data: studentData
                                });
                            }).catch(function (err) {
                                return res.json({
                                    status: status.bad_request_code,
                                    message: err.message,
                                    success: false,
                                });
                            });
                            
                        }
                    });
                }else{
                    return res.json({
                        status: status.bad_request_code,
                        message: "Do not allow empty Password",
                        success: false,
                    });
                }
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 87 ~ AuthController ~ registerStudent ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    } 
    
    
    /* Login Student */
    async loginStudent(req, res) {
        try {
            let student = await studentModel
                .findOne({
                    where: {
                        vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                        isDeleted: 0
                    }
                })

            if (student == null) {
                return res.json({
                    status: status.not_found_code,
                    message: "Account doesn't exist for this email, Please check email.",
                    success: false,
                });
            } else {
                if (req.body.vPassword) {
                    bcrypt.compare(req.body.vPassword, student.vPassword, async (err, isMatch) => {
                        if (isMatch && !err) {
    
                            let dateObj = new Date();
                            let minutes = 5;
                            let expiration_time = new Date(dateObj.getTime() + minutes * 60000);
                            let token = jwt.encode({ exp: expiration_time, iStudentID: student.iStudentID }, constants.JWT_ENCRYPTION_KEY);
    
                            let resData = JSON.parse(JSON.stringify(student));
                            resData.token = token;
    
                            return res.json({
                                status: status.success_code,
                                success: true,
                                message: "Student logged in successfully.",
                                data: resData
                            });
    
                        } else {
                            return res.json({
                                status: status.unauthorized_code,
                                message: "Password is incorrect.",
                                success: false,
                            });
                        }
                    })
                } else {
                    return res.json({
                        status: status.bad_request_code,
                        message: "Do not allow empty Password",
                        success: false,
                    });
                }
                
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 152 ~ AuthController ~ loginStudent ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }


    /* list Students */
    async listStudents(req, res) {
        try {
            await studentModel
                .findAll({
                    where: {
                        isDeleted: 0,
                    }
                }).then(async (students) => {

                    return res.json({
                        status: status.success_code,
                        message: "Student list find successfully.",
                        success: false,
                        data: students
                    });

                })
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 193 ~ AuthController ~ deleteStudent ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

    /* Delete Student */
    async deleteStudent(req, res) {
        try {
            await studentModel
                .findOne({
                    where: {
                        iStudentID: parseInt(req.body.iStudentID),
                        isDeleted: 0,
                    }
                }).then(async (student) => {

                    if (student) {
                        student.update({
                            isDeleted: 1,
                            dtUpdatedAt: new Date(),
                        }).then(async (resData) => {
                            return res.json({
                                status: status.success_code,
                                message: "Student has beed successfully deleted.",
                                success: true,
                            });
                        })

                    } else {
                        return res.json({
                            status: status.not_found_code,
                            message: "User not found.",
                            success: false,
                        });
                    }
                })
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 193 ~ AuthController ~ deleteStudent ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

}

module.exports = new AuthController();
