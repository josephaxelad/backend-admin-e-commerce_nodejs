const Product = require('../models/Product');
const fs = require('fs');

/**
 * Ajoute un élément 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create =  (req, res, next) => {
    const object = JSON.parse(req.body.product)
    delete req.body._id;
    const product = new Product({
        ...object,
        imageUrl: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
    });
    product.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

/**
 * Modifie un élément
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modify =  (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/products/')[1];
      fs.unlink(`images/products/${filename}`, () => {
        const object = JSON.parse(req.body.product);
        delete req.body._id;
        const product = req.file ? {
        ...object,
        imageUrl: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
        } : { ...object };
        Product.updateOne({ _id: req.params.id }, { 
            ...product,
            _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));

}

/**
 * Archive un élément
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.isHidden = (req, res, next) => {
    const isHidden = req.body.isHidden
    Product.updateOne({ _id: req.params.id },{$set : {isHidden : isHidden}})
        .then(() => res.status(200).json({ message: 'Objet masqué !'}))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Supprime un élément
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/products/')[1];
      fs.unlink(`images/products/${filename}`, () => {
        Product.updateOne({ _id: req.params.id },{$set : {isDeleted : true}})
        .then(() =>  res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));

    
}

/**
 * Supprime un élément définitivement de la base de donnée
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteHard = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé définitivement !'}))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Récupère un seul élément par son identifiant
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOne = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(value => res.status(200).json(value))
    .catch(error => res.status(404).json({ error }));
}

/**
 * Récupère tous les élément sauf les éléments supprimés
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAll =  (req, res, next) => {
    Product.find({ isDeleted : false})
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json({ error }));
}

/**
 * Récupère tous les éléments sauf les éléments supprimés définitivement de la base de donnée
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getVeryAll =  (req, res, next) => {
    Product.find()
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json({ error }));
}

