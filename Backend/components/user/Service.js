
const userModel = require('./Model');

const bcrypt = require('bcryptjs');

//kiểm tra email, pass
//nếu có trả về user
//nếu không trả về null
const login = async (email, password) => {
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            return isMatch ? user : false;
        }
        return null;

    } catch (error) {
        console.log('User service login error: ', error);
        throw error;
    }
}

const register = async (email, password, name) => {
    try {
        let user = await userModel.findOne({ email });
        console.log(email);
        if (user) return false;
        console.log('user service register', email, password, name);
        //ma hoa
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log(password, salt);
        user = new userModel({ email, password: hash, name });

        await user.save();
        return true;


    } catch (error) {
        console.log('User service register error: ', error);
    }
}


module.exports = { login, register };

var data = [
    { _id: 1, email: 'abc@gmail.com', password: '1', name: 'Nam' },
    { _id: 2, email: 'edf@gmail.com', password: '2', name: 'Hoa' },
]