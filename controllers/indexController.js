const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getHomePage = async (req, res) => {
  const categoryList = await Category.find();
  const products = await Product.find();
  const category = {
    name: 'All Products',
    description: 'All products from all categories',
  };

  res.render('category', { categoryList, products, category });
};

exports.getAddProductPage = async (req, res) => {
  const categoryList = await Category.find();
  res.render('productForm', { categoryList });
};

exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const selectedCategory = await Category.findById(category);

  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    stock,
  });

  res.redirect(selectedCategory.url);
};

exports.getAddCategoryPage = async (req, res) => {
  const categoryList = await Category.find();
  res.render('categoryForm', { categoryList });
};

exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = await Category.create({
    name,
    nameLower: name.toLowerCase(),
    description,
  });
  res.redirect(newCategory.url);
};
