const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')

mongoose.connect('mongodb+srv://semana:semana@mern-cluster-5vfir.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

app.listen(3333)