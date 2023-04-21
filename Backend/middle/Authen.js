const jwt = require('jsonwebtoken');


const checkTokenWeb = (req, res, next) => {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        // nếu ko có session thì bắt buộc phải login
        if (url.includes('/login')) {
            // nếu url có chứa login thì cho đi tiếp
            next();
        } else {
            // nếu url ko chứa login thì chuyển sang trang login
            return res.redirect('/login');
        }
    } else {
        // nếu có session thì kiểm tra token
        const { token } = session;
        if (!token) {
            // nếu không có token thì bắt buộc phải login
            if (url.includes('/login')) {
                // nếu url có chứa login thì cho đi tiếp
                return next();
            } else {
                // nếu url ko chứa login thì chuyển sang trang login
                return res.redirect('/login');
            }
        } else {
            // nếu có token thì phải verify token
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    // nếu token hết hạn thì bắt buộc phải login
                    if (url.includes('/login')) {
                        // nếu url có chứa login thì cho đi tiếp
                        return next();
                    } else {
                        // nếu url ko chứa login thì chuyển sang trang login
                        return res.redirect('/login');
                    }
                } else {
                    if (url.includes('/login')) {
                        // nếu url có chứa login thì chuyển qua trang chủ
                        return res.redirect('/');
                    } else {
                        // nếu url ko chứa login thì cho đi tiếp
                        return next();
                    }
                }
            });
        }
    }
}
const checkTokenApp = (req, res, next) =>{
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                // decoded = {_id: user._id}
                req.user = decoded;
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
}

module.exports = { checkTokenWeb, checkTokenApp };