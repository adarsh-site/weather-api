import express from 'express';
import "dotenv/config";
import rateLimit from 'express-rate-limit'
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter);
app.use("/", weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})