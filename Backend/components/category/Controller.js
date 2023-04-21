const  CategoryService = require('./Service');
const getCategories = async () => {
    try{
        return await CategoryService.getCategories();
    }catch(error){
        console.log(error);
    }
}

module.exports = {getCategories}