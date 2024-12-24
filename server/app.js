import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerRouter from './swagger.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import multer from 'multer';
import checkAuth from "./utils/checkAuth.js";
import cartRoutes from './routes/carts.js';
import orderRoutes from "./routes/orders.js";
import carts from "./routes/carts.js";

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});
const PORT = 5000;
const DB_URL = "mongodb://localhost:27017/electronicshopdb";

app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline';"
    );
    next();
});
app.use(swaggerRouter);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    try {
        const {name, description, price} = req.body;
        const imageUrl = req.file.path;

        res.status(201).json({
            message: 'Продукт успешно создан',
            product: {name, description, price, imageUrl},
        });
    } catch (err) {
        res.status(500).json({message: 'Ошибка при загрузке файла'});
    }
});

app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/carts', carts);
app.use('/drawer', cartRoutes);
app.use('/orders', orderRoutes);
let cart = {};

const main = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log(`Server running on port ${PORT}`);
        app.listen(PORT);

    } catch (error) {
        console.error("Error:", error);
    }
};

main().catch(console.log);
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    process.exit();
})
