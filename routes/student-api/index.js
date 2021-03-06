var express = require('express');
var router = express.Router();

var authRouter = require('./auth');
// var studentRouter = require('./student');

router.use('/auth', authRouter);
// router.use('/student', studentRouter);

module.exports = router;