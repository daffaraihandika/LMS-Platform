import express from "express";
import cors from "cors";
import routes from './routes/routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://apps.local.edly.io:1996']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(routes)

app.listen(5000, () => {
    console.log("server up and running on http://localhost:5000");
})