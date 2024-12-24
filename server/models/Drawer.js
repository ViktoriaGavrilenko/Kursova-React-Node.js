import mongoose from 'mongoose';

const DrawerSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true},
        }
    ],
    totalPrice: {type: Number, required: true},
}, {timestamps: true});
export default mongoose.model('Drawer', DrawerSchema);