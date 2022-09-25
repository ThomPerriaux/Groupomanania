const Post = require('../models/post.model')
const fs = require('fs')

//CREATION D'UN POST//
exports.createPost = (req, res) => {
     const postObjet = req.body

     delete postObjet._id //on réinitialise l'id du post
     delete postObjet._userId //on réinitialise l'id de l'auteur

     let filename = saveImage(req, res) //fonction saveImage va attriber un filename au fichier uploadé

     //gestion de l'horodatage des posts//
     let publiDay = new Date()
     const publiDate = publiDay.toLocaleString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
     })

     //definition de l'objet Post
     const post = new Post({
          ...postObjet,
          userId: req.auth.userId,
          imageUrl: filename
               ? `${req.protocol}://${req.get('host')}/images/${filename}`
               : null,
          date: Date.now(),
          publicationDate: publiDate,
          usersLiked: [],
          pseudo: req.body.pseudo,
     })

     post.save()
          .then(() => res.status(201).json(post))
          .catch((error) => {
               res.status(400).json({ error })
          })
}

//ENREGISTREMENT DE L'IMAGE
const saveImage = (req, res) => {

     let fileName = null //par defaut le filename est null

     if (req.file) {
          try {
               fileName = Date.now() + '.jpg'
               //definition des formats acceptés
               if (
                    req.file.mimetype !== 'image/jpg' &&
                    req.file.mimetype !== 'image/png' &&
                    req.file.mimetype !== 'image/jpeg' &&
                    req.file.mimetype !== 'image/webp'
               )
                    throw Error('Type de fichier invalide')
          } catch (err) {
               return res.status(400).json({ err })
          }
          fs.writeFile(`./images/${fileName}`, req.file.buffer, (err) => {
               if (err) throw err
          })
     }
     return fileName
}

//SUPPRESSION D'UN POST//
exports.deletePost = (req, res) => {
     Post.findOne({ _id: req.params.id })
          .then((post) => {
               if (post._id != req.params.id) {
                    res.status(401).json({ message: "Le post n'existe pas" })
               } else {
                    Post.deleteOne({ _id: req.params.id })
                         .then(() => {
                              res.status(200).json({
                                   message: 'Objet supprimé !',
                              })
                         })
                         .catch((error) =>
                              res.status(401).json({ message: error })
                         )
               }
          })
          .catch((error) => {
               res.status(500).json({ error })
          })
}

//MODIFICATION D'UN POST//
exports.modifyPost = (req, res) => {
     const postObjet = req.body

     Post.findOne({ _id: req.params.id }).then((post) => {
          if (post._id != req.params.id) {
               res.status(401).json({ message: 'Poste non trouvé !' })
          } else {
               Post.updateOne(
                    { _id: req.params.id },
                    { ...postObjet, _id: req.params.id }
               )
                    .then(() => res.status(200).json(postObjet))
                    .catch((error) => {
                         res.status(401).json({ error })
                    })
          }
     })
}

//AFFICHAGE DES POSTS//
exports.getAllPosts = (req, res) => {
     Post.find()
          .then((posts) => res.status(200).json(posts))
          .catch((error) => res.status(400).json({ error }))
}

//GESTION DES LIKES//
//Verif du currentUser : si a dejà liké => on le soustrait du tableau / sinon on l'ajoute
exports.likePost = (req, res) => {

     Post.findOne({ _id: req.params.id })
          .then((post) => {
               if (post.usersLiked.includes(req.auth.userId)) {

                    //dislike
                    Post.updateOne(
                         { _id: req.params.id },
                         { $pull: { usersLiked: req.auth.userId } } //usersLiked :array reprenant les userID likant le post
                    )
                         .then(() => {
                              res.status(200).json({
                                   likers: post.usersLiked.filter((c) => c !== req.auth.userId),
                                   _id: req.params.id,
                              })
                         })
                         .catch((error) => res.status(400).json({ error }))
               } else {

                    //like
                    Post.updateOne(
                         { _id: req.params.id },
                         {
                              $push: { usersLiked: req.auth.userId },
                         }
                    )
                         .then(() => {
                              post.usersLiked.push(req.auth.userId)
                              res.status(200).json({
                                   likers: post.usersLiked,
                                   _id: req.params.id,
                              })
                         })
                         .catch((error) => res.status(400).json({ error }))
               }
          })
          .catch((error) => res.status(400).json({ error }))
}