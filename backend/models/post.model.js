const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
      userId: { type: String, required: true },
      date: { type: String, required: true },
      publicationDate: { type: String, required: true },
      message: { type: String, required: true },
      imageUrl: { type: String, required: false },
      usersLiked: [{ type: String, required: true }],
      pseudo: { type: String, required: true }
 });

module.exports = mongoose.model("Post", postSchema);
