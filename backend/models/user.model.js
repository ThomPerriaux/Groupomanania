const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

//definition du modèle USER
const userSchema = mongoose.Schema({
      pseudo : {type : String, required: true, unique:true}, //pseudo unique grace à unique validator              
      email: { type: String, required: true, unique: true, validate :/[a-z]+.[a-z]+@groupomania.com/g}, //seuls les emails pros sont autorisés REGEX
      password: { type: String, required: true },
});

userSchema.plugin(UniqueValidator);

module.exports = mongoose.model("User", userSchema);