var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
      
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contributedBy: String,
  difficultyLevel: { type: String, unique: true, required: true },
  participants: {type: Number, default: 0}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Test", TestSchema);
