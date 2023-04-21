const productService = require('./Service');
const getAllproducts = async (page, size) => {
    try {
        return await productService.getAllproducts(page, size);
    } catch (error) {
        throw error;
    }
}
const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        return false;
    }
}

const addNewProduct = async(name, price, quantity, image, category) => {
    try {
        return await productService.addNewProduct(name, price, quantity, image, category);
    } catch (error) {
        return false;
    }
}

const getProductById = async (id) =>{
    try {
        return await productService.getProductById(id);
    } catch (error) {
        return null;
    }
}
const updateProductById = async (id, name, price, quantity, image, category) =>{
    try {
        return await productService.updateProductById(id, name, price, quantity, image, category);
    } catch (error) {
        return false;
    }
}

const searchProduct = async (keyword) =>{
    try {
        return await productService.searchProduct(keyword);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getAllproducts, deleteProductById , addNewProduct, getProductById, updateProductById, searchProduct};