const categoryModel = require('./Model')

const getCategories = async () => {

    try {
        //return data;
        //select * from categories
        return await categoryModel.find();
    } catch(error) {
        console.log(error);
    }
}
module.exports = { getCategories }

var data =
    [{
        "_id": 1,
        "name": "D'arcy"
    }, {
        "_id": 2,
        "name": "Cletus"
    }, {
        "_id": 3,
        "name": "Fabiano"
    }, {
        "_id": 4,
        "name": "Ambrosio"
    }, {
        "_id": 5,
        "name": "Hillyer"
    }, {
        "_id": 6,
        "name": "Franklin"
    }, {
        "_id": 7,
        "name": "Dollie"
    }, {
        "_id": 8,
        "name": "Carmelle"
    }, {
        "_id": 9,
        "name": "Marshal"
    }, {
        "_id": 10,
        "name": "Garreth"
    }]
