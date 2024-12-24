import Drawer from "../models/Drawer.js";

export const getUserOrder = async (req, res) => {
    try {
        const order = await Drawer.find({ user: req.userId })
            .sort({ createdAt: -1 })
            .populate('items.productId')
            .exec();
        if (!order) {
            return res.status(404).json({ message: "Замовлення не знайдено" });
        }
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка отримання замовлення" });
    }
};

export const createOrder = async (req, res) => {
    console.log('Отриман запрос на створення замовлення:', req.body);
    try {
        const { items, totalPrice } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Список товаров не може бути пустим" });
        }
        console.log('Дані для збереження замовлення:', items);

        const order = new Drawer({
            user: req.userId,
            items,
            totalPrice,
        });
        console.log('Дані замовлення перед збереженням:', {
            user: req.userId,
            items,
            totalPrice,
        });

        await order.save();
        console.log('Замовлення успішно збережено:', order);

        res.status(201).json(order);
    } catch (err) {
        console.error('Помимлка при створенні замовлення:', err);
        res.status(500).json({ message: "Помимлка при створенні замовлення" });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const orderId = req.params.id;

        const updatedOrder = await Drawer.findByIdAndUpdate(
            orderId,
            { items },
            { new: true }
        ).populate('items.productId');

        if (!updatedOrder) {
            return res.status(404).json({ message: "Замовлення не знайдено" });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка оновлення замовлення" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const deletedOrder = await Drawer.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Замовлення не знайдено" });
        }

        res.json({ message: "Замовленя видалено" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка видалення замовлення" });
    }
};
