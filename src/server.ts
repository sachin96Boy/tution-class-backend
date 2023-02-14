import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';


const app: Express = express();

dotenv.config();


app.use(cors());
// logging
app.use(morgan('dev'));
// take care of JSON Data
app.use(express.json());
// parse the request body
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes)


const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


