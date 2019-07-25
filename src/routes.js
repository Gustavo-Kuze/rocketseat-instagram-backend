const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const uploadsConfig = require('./config/upload');
const multer = require('multer');

const routes = express.Router();

const upload = multer(uploadsConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.delete('/posts/:id', PostController.delete);
routes.delete('/allposts', PostController.deleteAll);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;