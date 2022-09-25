const mongoose = require("mongoose");

//Creation du modele POST avec schema Mongoose
const postSchema = mongoose.Schema({
      userId: { type: String, required: true },
      date: { type: String, required: true },
      publicationDate: { type: String, required: true },
      message: { type: String, required: true },
      imageUrl: { type: String, required: false }, //image non requise pour poster
      usersLiked: [{ type: String, required: true }],
      pseudo: { type: String, required: true }
 });

module.exports = mongoose.model("Post", postSchema); //export du modèle sous le nom de Post
