import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: "fashion"| "electronics" | "food" | "others";
  stock: number;
  images: string[];
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["fashion", "electronics", "food", "others"],  // Allowed property types
      required: true
    },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
