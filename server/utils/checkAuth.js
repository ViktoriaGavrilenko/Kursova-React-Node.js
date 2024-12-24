import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Немає доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Немає доступа',
        });
    }
};
