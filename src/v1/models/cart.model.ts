import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  _id: any;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends Document {
  cartId: string;
  items: CartItem[];
}

const CartItemSchema = new Schema<CartItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const CartSchema = new Schema<CartDocument>(
  {
    cartId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model<CartDocument>('Cart', CartSchema);
