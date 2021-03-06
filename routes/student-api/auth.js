const express = require('express');
const router = express.Router();
const authController = require('../../controllers/student/authController');


const auth = require("../../middleware/validateRequest");


router.post('/register',authController.registerStudent);
router.post('/login',authController.loginStudent);
router.post('/delete',auth,authController.deleteStudent);
router.get('/list',auth,authController.listStudents);

module.exports = router; 