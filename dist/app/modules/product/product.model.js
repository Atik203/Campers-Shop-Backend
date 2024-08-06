"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSchema = exports.reviewSchema = exports.authorReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.authorReviewSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
});
exports.reviewSchema = new mongoose_1.Schema({
    totalCounts: { type: Number, required: true },
    counts: [
        {
            rating: { type: Number, required: true },
            count: { type: Number, required: true },
        },
    ],
    featured: [exports.authorReviewSchema],
});
exports.productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, default: 0 },
    brand: { type: String, required: true },
    reviews: exports.reviewSchema,
    inStock: { type: Boolean, default: true },
    sizes: { type: [String], enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    colors: [
        {
            name: { type: String, required: true },
            hex: { type: String, required: true },
        },
    ],
    quantity: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.productSchema.pre('save', function (next) {
    if (this.reviews && this.reviews.featured.length > 0) {
        const totalRating = this.reviews.featured.reduce((sum, authorReview) => sum + authorReview.rating, 0);
        const totalReviews = this.reviews.featured.length;
        this.averageRating = parseFloat((totalRating / totalReviews).toFixed(1));
        // Update totalCounts and counts for each rating section
        this.reviews.totalCounts = totalReviews;
        const ratingCounts = this.reviews.featured.reduce((acc, authorReview) => {
            acc[authorReview.rating] = (acc[authorReview.rating] || 0) + 1;
            return acc;
        }, {});
        this.reviews.counts = [
            { rating: 1, count: ratingCounts[1] || 0 },
            { rating: 2, count: ratingCounts[2] || 0 },
            { rating: 3, count: ratingCounts[3] || 0 },
            { rating: 4, count: ratingCounts[4] || 0 },
            { rating: 5, count: ratingCounts[5] || 0 },
        ];
    }
    else {
        this.averageRating = 0;
    }
    next();
});
// not get the deleted product
exports.productSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
});
exports.Product = (0, mongoose_1.model)('Product', exports.productSchema);
