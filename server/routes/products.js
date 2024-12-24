import express from 'express';
import {productCreateValidation} from "../validations.js";
import checkAuth from "../utils/checkAuth.js";
import * as ProductController from '../controllers/ProductController.js';
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = express.Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', checkAuth, productCreateValidation, handleValidationErrors, ProductController.create);
router.delete('/:id', checkAuth, ProductController.remove);
router.patch('/:id', checkAuth, productCreateValidation, handleValidationErrors, ProductController.update);

export default router;