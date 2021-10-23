const Category = require('../models/Category');

/**
 * Ajoute un élément 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create =  (req, res, next) => {
    delete req.body._id;
    const category = new Category({
        ...req.body
    });
    category.save()
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
    Category.updateOne({ _id: req.params.id }, { 
        name: req.body.name,
        isParent: req.body.isParent,
        idParent: req.body.idParent,
        _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Supprime un élément
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = (req, res, next) => {
    Category.updateOne({ _id: req.params.id },{$set : {isDeleted : true}})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Supprime un élément définitivement de la base de donnée
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteHard = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
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
    Category.findOne({ _id: req.params.id })
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
    Category.find({ isDeleted : false})
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
    Category.find()
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json({ error }));
}

