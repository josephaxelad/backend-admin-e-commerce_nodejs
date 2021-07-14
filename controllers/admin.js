const Admin = require('../models/Admin');

exports.create =  (req, res, next) => {    
    delete req.body._id;
    delete req.body.user._id;
    const admin = new Admin({
        user: req.body.user,
        login: req.body.login,
        password: req.body.password,
        isDeleted: req.body.isDeleted,
        role: req.body.role,
    });
    admin.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modify =  (req, res, next) => {
    Admin.updateOne({ _id: req.params.id }, { 
        user: req.body.user,
        login: req.body.login,
        password: req.body.password,
        isDeleted: req.body.isDeleted,
        role : req.body.role,
        _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyRole =  (req, res, next) => {
    Admin.updateOne({ _id: req.params.id }, { $set : {role : req.body.role} })
        .then(() => res.status(200).json({ message: "Role de l'utilisateur modifié !"}))
        .catch(error => res.status(400).json({ error }));
}

exports.delete = (req, res, next) => {
    Admin.updateOne({ _id: req.params.id },{$set : {isDeleted : true}})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteHard = (req, res, next) => {
    Admin.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé définitivement !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOne = (req, res, next) => {
    Admin.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
}

exports.getAll =  (req, res, next) => {
    Admin.find({ isDeleted : false})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getVeryAll =  (req, res, next) => {
    Admin.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}