const express = require('express');
const mongoose = require ('mongoose');
const postsRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const path = require ('path');
const app = express();

//DB
mongoose.connect('mongodb+srv://Groupomania:Groupomania@cluster0.t9ljkm4.mongodb.net/Groupomania',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/profile', postsRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;