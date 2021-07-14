//Créé application express

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importer les routes
const adminRoutes = require('./routes/admin')


mongoose.connect('mongodb+srv://josephaxelad:n4141O154@cluster0.fzbwh.mongodb.net/shop?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Eviter les erreurs de CORS signifie « Cross Origin Resource Sharing »
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);



// Expoter l'app pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;