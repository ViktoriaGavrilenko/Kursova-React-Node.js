import {body} from 'express-validator'
export const loginValidation = [
    body('email','Невірний формат пошти').isEmail(),
    body('password','Пароль повинен бути мінімум 5 символів').isLength({min:5}),
];
export const registerValidation = [
    body('email','Невірний формат пошти').isEmail(),
    body('password','Пароль повинен бути мінімум 5 символів').isLength({min:5}),
    body('fullName','Вкажіть імя').isLength({min:3}),
];
export const productCreateValidation = [
    body('name','Введіть назву товара').isLength({min:3}).isString(),
    body('description','Введіть опис товара').isLength({min:3}).isString(),
    body('tags','Невірний формат тега(вкажіть масив)').optional().isString(),
    body('imageURL','Невірна ссилка на відображення').optional().isString(),
];