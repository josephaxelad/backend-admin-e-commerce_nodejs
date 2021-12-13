const Customer = require('../models/Customer');
const bcrypt = require('bcrypt'); //Cryptage du mot de passe
const jwt = require('jsonwebtoken'); //Token

exports.signUp =  (req, res, next) => {
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        delete req.body._id;
        delete req.body.user._id;
        const customer = new Customer({
            user: req.body.user,
            password: hash,
            isDeleted: req.body.isDeleted
        });
        customer.save()
        .then(() => res.status(201).json({ message: 'Compte créé avec succès !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.modify =  (req, res, next) => {
    Customer.updateOne({ _id: req.params.id }, { 
        user: req.body.user,
        password: req.body.password,
        isDeleted: req.body.isDeleted,
        _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modifications effectuées avec succès !'}))
    .catch(error => res.status(400).json({ error }));
}

/**
 * Active ou désactive un élément
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.isDisabled = (req, res, next) => {
    const isDisabled = req.body.isDisabled
    Customer.updateOne({ _id: req.params.id },{$set : {isDisabled : isDisabled}})
        .then(() => res.status(200).json({ message: 'Client mise à jour !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.delete = (req, res, next) => {
    Customer.updateOne({ _id: req.params.id },{$set : {isDeleted : true}})
        .then(() => res.status(200).json({ message: 'Compte supprimé avec succès!'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteHard = (req, res, next) => {
    Customer.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé définitivement !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOne = (req, res, next) => {
    Customer.findOne({ _id: req.params.id , isDeleted : false })
    .then(thing => res.status(200).json(thing.user))
    .catch(error => res.status(404).json({ error }));
}

exports.getAll =  (req, res, next) => {
    Customer.find({ isDeleted : false},{password : 0})
    .then(customers => res.status(200).json(customers))
    .catch(error => res.status(400).json({ error }));
}

exports.getVeryAll =  (req, res, next) => {
    Customer.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.login = (req, res, next) => {
    Customer.findOne({ 'user.email' : req.body.email })
    .then((customer)=>{
        if (!customer) {
            return  res.status(401).json({code : 0, error: "Cette adresse email n'existe pas!" });
        }
        bcrypt.compare(req.body.password, customer.password)
        .then((valid)=>{
            if (!valid) {
                return res.status(401).json({code : 0, error: 'Mot de passe incorrect !' });
            } 
            res.status(200).json({
                id: customer._id,
                token: jwt.sign(
                    { id: customer._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}