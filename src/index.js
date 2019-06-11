const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://semana:semana@mern-cluster-5vfir.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.get('/', ((req, res) => {
    res.send('Meu teste')
}));

app.listen(3333)