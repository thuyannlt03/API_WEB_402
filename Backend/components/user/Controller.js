
const mailer = require('nodemailer');
const userService = require('./Service');
const login = async (email, password) =>{
    try {
        return await userService.login(email,password);
        
    } catch (error) {
        console.log("Error login controller" + error);

    }
    return false;
}
const register = async (email, password, name) =>{
    try {
        return await userService.register(email,password, name);
        
    } catch (error) {
        console.log("Error register controller" + error);

    }
    return false;
}
const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'atssinz7@gmail.com',
        pass: 'sqeotfunvrndoytz'
    },
});

const sendMail = async(to, subject, content) =>{
    try {
        const mailOptions = {
            from: 'Đứa bạn dễ huông <atssinz7@gmail.com>',
            to,
            subject,
            html: content
        }
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log("Error sendMail controller" + error);
    }
    return false;
}

module.exports = {login, register, sendMail};
