import ProductModel from '../models/Product.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.find().populate('user').exec();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось отримати продукти",
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Отриман productId:', productId);

        const doc = await ProductModel.findOneAndUpdate(
            {_id: productId},
            {$inc: {viewsCount: 1}},
            {returnDocument: 'after'}
        );

        if (!doc) {
            console.warn('Продукт не знайдено:', productId);
            return res.status(404).json({
                message: 'Продукт не знайдено',
            });
        }

        res.json(doc);
    } catch (err) {
        console.error('Помилка на сервере:', err);
        res.status(500).json({
            message: "Не вдалось отримати продукт",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const productId = req.params.id;

        const doc = await ProductModel.findByIdAndDelete(productId);

        if (!doc) {
            console.warn('Продукт не знайдено:', productId);
            return res.status(404).json({
                message: 'Продукт не знайдено',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error('Помилка на сервере:', err);
        res.status(500).json({
            message: "Не вдалось видалити продукт",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            imageURL: req.body.imageURL,
            viewsCount: req.body.viewsCount,
            user: req.userId,
        });

        const product = await doc.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось створити продукт",
        });
    }
};

export const update = async (req, res) => {
    try {
        const productId = req.params.id;
        await ProductModel.updateOne(
            {_id: productId},
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                imageURL: req.body.imageURL,
                category: req.body.category,
                user: req.userId,
            },
        );
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось оновити продукт",
        })
    }
}