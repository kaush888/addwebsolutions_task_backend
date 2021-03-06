const jwt = require('jwt-simple');
const status = require('../config/statuscode').status;
var { JWT_ENCRYPTION_KEY } = require('../config/constants')


module.exports = async function (req, res, next) {

    // When performing a cross domain request, you will recieve a preflighted
    // request first. This is to check if our the app is safe. We skip the token
    // outh for [OPTIONS] requests. if(req.method == 'OPTIONS') next();
    var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['token'];
    console.log("🚀 ~ file: validateRequest.js ~ line 12 ~ token", token)

    if (token) {
        try {
            var decoded = jwt.decode(token, JWT_ENCRYPTION_KEY);
            console.log("🚀 ~ file: validateRequest.js ~ line 17 ~ decoded", decoded)
            if (new Date(decoded.exp) <= new Date(Date.now())) {
                res.json({ 
                    status: status.unauthorized_code, 
                    message: "Your token is expired. Please login again." 
                });
                return;
            }
            next();

        } catch (err) {
            console.log("🚀 ~ file: validateRequest.js ~ line 30 ~ err", err)
            res.json({ 
                status: status.internal_server_error_code, 
                "message": "Oops! Something went wrong.", 
                error: err 
            });
        }
    } else {
        res.json({ 
            status: status.unauthorized_code, 
            message: "Oops! Something went wrong." 
        });
        return;
    }
};