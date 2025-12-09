import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import userSpyApi from './backend/api/user.api.js';
import sudokuApi from './backend/api/sudoku.api.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res, next) => {
    if (req.cookies.username) {
        req.username = req.cookies.username;
    }
    next();
});

// --- 数据库连接 ---
// !!! 记得替换成你的 MongoDB Connection String !!!
const MONGODB_URL = process.env.MONGO_URL;
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// --- API 路由挂载 ---
// 对应文档要求的路径
app.use('/api/user', userSpyApi);
app.use('/api/sudoku', sudokuApi);


// --- 前端静态文件托管 ---
const frontend_dir = path.join(path.resolve(), 'dist');
app.use(express.static(frontend_dir));

app.get('*', function (req, res) {
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(8000, function() {
    console.log("Starting server on port 8000...");
});
