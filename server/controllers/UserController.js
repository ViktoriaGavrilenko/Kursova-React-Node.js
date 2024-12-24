import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
        });
        const user = await doc.save();
        console.log("Saved user:", user);
        if (!user) {
            return res.status(500).json({message: "Не вдалося зарееструватися"});
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: '30d',
            },
        );
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({
            message: "Не вдалося зарееструватися",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайден',
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Невірний логін та пароль',
            })
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: '30d',
            },
        );
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Помилка при авторизації",
        });
    }
    console.log('Received Authorization Header:', req.headers.authorization);
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайден'
            });
        }
        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Немає доступа'
        })
    }
};