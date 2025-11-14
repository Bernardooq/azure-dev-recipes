const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoutes.js');
const recipeRoute = require('./routes/recipeRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js');
const authRoute = require('./routes/authRoutes.js');
const messageRoute = require('./routes/messagesRoutes.js');
const reviewRoute = require('./routes/reviewRoutes.js');
const path = require('path');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req,res)=> {
    res.send("hello");
});

// middlewares y rutas
app.use('/api/users', userRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);

module.exports = app;
