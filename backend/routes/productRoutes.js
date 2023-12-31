import express from 'express';
import asyncHandler from 'express-async-handler';

// Model
import Product from '../models/productModel.js'

// Auth middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

router.get('/toprated', asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
}));

router.post('/search', asyncHandler(async (req, res) => {
    const results = await Product.find({
        name: { $regex: req.query.keyword, $options: 'i' }
    });
    res.status(200);
    res.json(results);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Product not found!' });
    }
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.status(200);
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }

}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0
    });

    await product.save();
    res.status(201);
    res.json(product);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.description = req.body.description;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;

        await product.save();
        res.status(200);
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

router.post('/:id/reviews', protect, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const isReviewedByUser = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if (isReviewedByUser) {
            res.status(400);
            throw new Error('Product is already reviewd by user');
        }

        const review = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            user: req.user._id
        };
        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201);
        res.json({
            message: 'Review added to product'
        });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

export default router;