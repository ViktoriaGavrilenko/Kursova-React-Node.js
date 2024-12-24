import express from 'express';
import checkAuth from '../utils/checkAuth.js';
import Drawer from '../models/Drawer.js';

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
    try {
        const drawer = await Drawer.findOne({user: req.userId}).populate('items.productId').exec();
        if (!drawer || drawer.items.length === 0) {
            return res.json([]);
        }
        res.json(drawer.items);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Помилка при отриманні корзини'});
    }
});

router.post('/', checkAuth, async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({message: 'productId и quantity обовязкові'});
        }
        let drawer = await Drawer.findOne({user: req.userId}).populate('items.productId').exec();

        if (!drawer) {
            drawer = new Drawer({
                user: req.userId,
                items: [{productId, quantity}],
            });
        } else {
            const existingItem = drawer.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                drawer.items.push({productId, quantity});
            }
        }
        await drawer.save();

        res.status(200).json({
            message: 'Product added to cart',
            drawer: drawer.items,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Помилка додавання у корзину'});
    }
});

router.delete('/drawer/:_id', async (req, res) => {
    const productId = req.params._id;
    try {
        await Drawer.updateOne(
            {"items.productId": productId},
            {$pull: {items: {productId}}}
        );
        res.status(200).send({message: 'Товар успішно видалено'});
    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Помилка при видаленні товара'});
    }
});
export default router;

