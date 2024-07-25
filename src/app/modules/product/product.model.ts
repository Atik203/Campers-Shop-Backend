import { Document, model, Schema } from 'mongoose';
import { TProduct, TReview } from './product.interface';
export const reviewSchema = new Schema<TReview>({
  comment: { type: String },
  rating: { type: Number },
});

export const productSchema = new Schema<TProduct, Document>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    brand: { type: String, required: true },
    reviews: [reviewSchema],
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
    this.averageRating = totalRating / this.reviews.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

export const Product = model<TProduct, Document>('Product', productSchema);
