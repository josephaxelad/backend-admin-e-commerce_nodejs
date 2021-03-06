//Créé application express

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Importer les routes
const adminRoutes = require('./routes/admin')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer')

if (process.env.USERNAME == "josephaxelad") {
  mongoose.connect('mongodb://127.0.0.1:27017/shop?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
   })
  .then(() => console.log('Connexion à MongoDB réussie (local) !'))
  .catch(() => console.log('Connexion à MongoDB échouée (local) !'));
} else {
  mongoose.connect('mongodb+srv://josephaxelad:n4141O154@cluster0.fzbwh.mongodb.net/shop?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
}


  
// Eviter les erreurs de CORS signifie « Cross Origin Resource Sharing »
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user', customerRoutes);



// Expoter l'app pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;