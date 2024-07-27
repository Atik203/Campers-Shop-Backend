import { model, Schema } from 'mongoose';
import { TProduct, TReview } from './product.interface';
export const reviewSchema = new Schema<TReview>({
  comment: { type: String },
  rating: { type: Number },
  name: { type: String },
  image: { type: String },
});

export const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, default: 0 },
    brand: { type: String, required: true },
    reviews: [reviewSchema],
    inStock: { type: Boolean, default: true },
    size: { type: String },
  },
  {
    timestamps: true,
  },
);
productSchema.pre('save', function (next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    this.averageRating = parseFloat(
      (totalRating / this.reviews.length).toFixed(1),
    );
  } else {
    this.averageRating = 0;
  }
  next();
});

export const Product = model<TProduct>('Product', productSchema);
