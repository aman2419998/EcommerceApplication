import asyncHandler from "express-async-handler";
import Products from "../models/productModel.js";

// @desc Fetch All Product
// @route GET /api/products
// @access public

const fetchProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single Product
// @route GET /api/products/:id
// @access public

const fetchProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product Not Found`);
  }
});

// @desc DELETE a product
// @route DELETE /api/products/:id
// @access public/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await product.remove();

    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error(`Product Not Found`);
  }
});

// @desc CREATE a product
// @route POST /api/products
// @access public/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await Products.create({
    name: req.body.name || "Sample Name",
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    user: req.user._id,
    category: "sample category",
    description: "sample Description",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });

  const createdProduct = await product.save();
  res.send(createdProduct);
});

// @desc UPDATE a product
// @route PUT /api/products/:id
// @access public/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updateProduct = await product.save();

    res.json(updateProduct);
  } else {
    res.status(402);
    throw new Error(`Product not found!`);
  }
});

// @desc CREATE a new Review
// @route POST /api/products/:id/review
// @access public

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (re) => re.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error(`Product Already Reviewed`);
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(402);
    throw new Error(`Product not found!`);
  }
});

// @desc GET Top rated Products
// @route GET /api/products/top
// @access public

const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Products.find({}).sort({ rating: -1 }).limit(3);

  res.json(product);
});

export {
  fetchProducts,
  fetchProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
};
