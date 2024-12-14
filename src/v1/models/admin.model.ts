// Admin.model.ts
import mongoose, { Schema, model, Document, Types, Model } from 'mongoose';

//Declared interface for the admin model
export interface IAdmin extends Document {
  email: string;
  fullName: string
  password: string; 
  dateCreated?: Date;
  role: string; 
}

//Admin schema
const adminSchema: Schema<IAdmin> = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },
    fullName: { type: String, default: 'Admin' },
    dateCreated: { type: Date, default: Date.now },
    role: { type: String, default: 'admin' },
  },
  { collection: 'admin' }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;

