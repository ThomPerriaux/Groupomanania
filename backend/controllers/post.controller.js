const Post = require('../models/post.model')
const fs = require('fs')

exports.createPost = (req, res) => {
     const postObjet = req.body
     delete postObjet._id
     delete postObjet._userId

     let filename = saveImage(req, res)


     let today = Date.now()
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
 
     const post = new Post({
          ...postObjet,
          userId: req.auth.userId,
          imageUrl: filename? `${req.protocol}://${req.get('host')}/images/${filename}`:null,
          date: today,
          publicationDate: publiDate,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
          pseudo: req.body.pseudo,
     })

     post.save()
          .then(() => 
          
          res.status(201).json(post))
          .catch((error) => {
               res.status(400).json({ error })
          })
}

exports.deletePost = (req, res) => {
     Post.findOne({ _id: req.params.id })
          .then((post) => {
               if (post._id != req.params.id) {
                    res.status(401).json({ message: 'Not authorized' })
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

exports.modifyPost = (req, res) => {
      const postObjet = req.body
      Post
          .findOne({ _id: req.params.id })
          .then((post) => {
               if (post._id != req.params.id) {
                    res.status(401).json({ message: 'Non autorisé !' })
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

exports.getOnePost = (req, res) => {
     Post.findOne({ _id: req.params.id })
          .then(() =>
               res.status(200).json({res})
          )
          .catch((error) => res.status(400).json({ error }))
}

exports.getAllPosts = (req, res) => {
     Post.find()
          .then((posts) => res.status(200).json(posts))
          .catch((error) => res.status(400).json({ error }))
}

exports.likePost = (req, res) => {
     Post.findOne({ _id: req.params.id }) //le post est celui des params d'url
          .then((post) => {
               if (post.usersLiked.includes(req.auth.userId)) {
                    Post.updateOne(
                         { _id: req.params.id },
                         {
                              $pull: { usersLiked: req.auth.userId },
                              $inc: { likes: -1 },
                         }
                    )
                         .then(() => {
                              res.status(200).json({
                                   likers : post.usersLiked.filter(c => c !== req.auth.userId),
                                   _id: req.params.id
                              })
                         })
                         .catch((error) => res.status(400).json({ error }))
               } else {
                    Post.updateOne(
                         { _id: req.params.id },
                         {
                              $push: { usersLiked: req.auth.userId },
                              $inc: { likes: 1 },
                         }
                    )
                         .then(() => {
                              post.usersLiked.push(req.auth.userId)
                              res.status(200).json({
                                   likers: post.usersLiked,
                                   _id: req.params.id
                              })
                         })
                         .catch((error) => res.status(400).json({ error }))
               }
          })
          .catch((error) => res.status(400).json({ error }))
}

const saveImage = (req, res) => {
     let fileName = null //declare var

     if (req.file) {
          try {
          fileName = Date.now() + '.jpg' //utilise
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

          //stockage de la nouvelle image.
          //Buffer : tableau de bytes
          fs.writeFile(`./images/${fileName}`, req.file.buffer, (err) => {
               if (err) throw err
          })
     }

     return fileName
}
