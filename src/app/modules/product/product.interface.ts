export interface TReview {
  comment: string;
  rating: number;
}

export interface TProduct {
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  averageRating?: number;
  brand: string;
  reviews?: TReview[];
}
