import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
const app = express();

const router = express.Router();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'API for Todo application',
        },
    },
    apis: ['./routes/*.js'], // Путь к вашим файлам с API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   notes:
 *                     type: string
 *                   createdAt:
 *                     type: string
 */
/*
app.get('/api/products', (req, res) => {
    res.json([{ title: 'Task 1', notes: 'Note for task 1', createdAt: '2024-11-07' }]);
});

 */
/*
app.post('/products', (req, res) => {
    res.json([{ id: 1, name: 'Apple', price: 1.5 }]);
});
*/
export default router;
