"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProductQuery = void 0;
const buildProductQuery = (req) => {
    const query = {};
    const { averageRating, size, category, stock, color, minPrice, maxPrice, search, page = '1', limit = '100', } = req.query;
    if (averageRating) {
        const ratings = Array.isArray(averageRating)
            ? averageRating
            : [averageRating];
        const ratingConditions = ratings.map((rating) => {
            const ratingValue = Math.floor(Number(rating));
            return {
                averageRating: {
                    $gte: ratingValue,
                    $lt: ratingValue + 1,
                },
            };
        });
        query.$or = ratingConditions;
    }
    if (size) {
        const sizes = Array.isArray(size) ? size : [size];
        query.sizes = { $in: sizes };
    }
    if (category) {
        const categories = Array.isArray(category) ? category : [category];
        query.category = { $in: categories };
    }
    if (stock) {
        const stocks = Array.isArray(stock) ? stock : [stock];
        query.inStock = { $in: stocks.map((s) => s === 'in') };
    }
    if (color) {
        const colors = Array.isArray(color) ? color : [color];
        query.colors = { $elemMatch: { name: { $in: colors } } };
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) {
            query.price.$gte = Number(minPrice);
        }
        if (maxPrice) {
            query.price.$lte = Number(maxPrice);
        }
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }
    const pagination = {
        skip: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
    };
    return { query, pagination };
};
exports.buildProductQuery = buildProductQuery;
