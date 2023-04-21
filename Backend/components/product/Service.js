// lấy danh sách sản phẩm trong database
const productModel = require('./Model');

const getAllproducts = async (page, size) => {
  try {
    //form *
    //return await productModel.find();
    let skip = (page - 1) * size;
    let limit = size;
      return await productModel
      .find({}, 'name price quantity image category') //lay cac truong mong muon
      .populate('category', 'name')
      .sort({price: -1})//sap xep giam dan theo gia
      //.skip(3) //bo qua bao nhieu san pham
      //.limit(3) // lay bao nhieu san pham
      

  } catch (error) {
    console.log(error);
  }
  return [];
};
// xóa sản phẩm theo id
const deleteProductById = async (id) => {
  try {
    console.log(id);
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};

// thêm mới sản phẩm vào database
const addNewProduct = async (name, price, quantity, image, category) => {
  try {
    const newProduct = new productModel({
      name, price, quantity, image, category
    });
    await newProduct.save();
    return true;
  } catch (error) {
    console.log('Add new product errorsssss: ', error);
    return false;
  }
  
}

//lấy thông tin 1 sản phẩm theo id
const getProductById = async (id) => {
  try {
   
     return await productModel.findById(id);
   
  } catch (error) {
    console.log('Get product by id error: ', error);
  }
  return null;
}

//cập nhật sản phẩm theo id
const updateProductById = async (id, name, price, quantity, image, category) => {
  try {
   
    const product = await productModel.findById(id);
    if (product) {
     
      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      product.quantity = quantity ? quantity : product.quantity;
      product.image = image ? image : product.image;
      product.category = category ? category : product.category;
      await product.save();
      return true;
    }

  } catch (error) {
    console.log('Update product by id error: ', error);

  }
  return false;
}

// tim kiem san pham
// select * from products where name like '%keyword%'
// and price > 1000
// and quantity > 100 or quantity < 1000

const searchProduct = async (keyword) =>{
  try {
    let query ={
      quantity: {$gt: 10, $lt: 100},
      name: {$regex: keyword, $options: 'iphone'},
      $or: [{price: {$gt: 100}}, {price:{$lt:1000}}]

    };
    let products = await productModel.find(query);
    return products;
  } catch (error) {
    console.log('Search product error: ', error);
  }
  return [];
}

module.exports = { getAllproducts, deleteProductById, addNewProduct, getProductById, updateProductById, searchProduct };

var data =
  [{
    "_id": 1,
    "name": "Danya",
    "price": 46,
    "quantity": 34,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 8
  }, {
    "_id": 2,
    "name": "Betsey",
    "price": 76,
    "quantity": 98,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 3
  }, {
    "_id": 3,
    "name": "Mimi",
    "price": 45,
    "quantity": 85,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 1
  }, {
    "_id": 4,
    "name": "Dolf",
    "price": 68,
    "quantity": 86,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 7
  }, {
    "_id": 5,
    "name": "Leupold",
    "price": 87,
    "quantity": 24,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 5
  }, {
    "_id": 6,
    "name": "Scott",
    "price": 43,
    "quantity": 28,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 10
  }, {
    "_id": 7,
    "name": "Lombard",
    "price": 18,
    "quantity": 50,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 3
  }, {
    "_id": 8,
    "name": "Catie",
    "price": 35,
    "quantity": 85,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 2
  }, {
    "_id": 9,
    "name": "Jillana",
    "price": 1,
    "quantity": 80,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 7
  }, {
    "_id": 10,
    "name": "Liam",
    "price": 7,
    "quantity": 33,
    "image": "https://i.pinimg.com/236x/5e/00/2c/5e002c1bcf7690e21425ea06e4b697c1.jpg",
    "category": 4
  }]