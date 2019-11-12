require('dotenv').config();
var   express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      helmet         = require("helmet"),
      flash          = require("connect-flash"),
      moment         = require("moment"),
      LocalStrategy  = require("passport-local"),
      passport       = require("passport");


app.set("view engine", "ejs");
app.use(flash());

app.use(express.static(__dirname+"/public"));
      
//==================
//    ROUTES
//==================
      
app.get('/', (req, res) => res.render('landing'));
      
      
      
      
      
      
      
      
//===================================
//assigning port to server
//===================================
      
app.listen(process.env.PORT,process.env.HOST, function(err, res){
    if(err){
        console.log("server is not connected")
    }
    else{
        console.log("server connected");
    }
});