var mongoose = require("mongoose");


var testPaperSchema = new mongoose.Schema({
   question: String,
   option1: String,
   option2: String,
   option3: String,
   option4: String,
   ans: String,
   isApproved: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("testPaper", testPaperSchema);