const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')

//logique d'enregistrement//
exports.signUp = (req, res) => {
     bcrypt
          .hash(req.body.password, 10) //hashage du mdp 10 tours
          .then((hash) => {
               const user = new User({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash,
               })
               user.save()
                    .then(() =>
                         res.status(201).json({ message: 'Utilisateur créé !' })
                    )
                    .catch((error) => res.status(400).json({ error }))
          })
          .catch((error) => res.status(500).json({ error }))
}

//logique de connection//
exports.logIn = (req, res) => {
      //verif si user existe
     User.findOne({ email: req.body.email })
          .then((user) => {
               if (!user) {
                    return res
                         .status(401)
                         .json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' })
               }
               //si l'user est trouvé on verifie le mdp
               bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                         if (!valid) {
                              return res.status(401).json({
                                   error: 'Mot de passe incorrect!',
                              })
                         }
                         //user+mdp existe on retourne pseudo/userId/Token
                         res.status(200).json({
                              pseudo: user.pseudo,
                              userId: user._id,
                              token: jwt.sign(
                                   { userId: user._id },
                                   'RANDOM_TOKEN_SECRET',//clé de cryptage
                                   { expiresIn: '24h' } //token expire dans 24h sauf si log-out
                              ),
                         })
                    })
                    .catch((error) => res.status(500).json({ error }))
          })
          .catch((error) => res.status(500).json({ error }))
}
