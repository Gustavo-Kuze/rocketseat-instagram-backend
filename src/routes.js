const express = require('express');
const PostController = require('./controllers/PostController');
const uploadsConfig = require('./config/upload');
const multer = require('multer');

const routes = express.Router();

const upload = multer(uploadsConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

module.exports = routes;