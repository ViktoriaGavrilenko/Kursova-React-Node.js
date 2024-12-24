import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true, unique: true},
    category: {type: String, enum: ['Phone', 'Laptop', 'Tablet']},
    imageURL: {type: String},
    viewsCount: {type: Number, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true,
});
export default mongoose.model('Product', ProductSchema);
