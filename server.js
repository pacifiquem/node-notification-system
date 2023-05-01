import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: "./config/.env"
});
const app = express();
let port = process.env.DEV_PORT || 1219


app.listen(port, () => {
    console.log(`*********SERVER IS RUNNING ${port}********`);
});