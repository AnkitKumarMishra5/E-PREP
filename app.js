var   express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      helmet         = require("helmet"),
      flash          = require("connect-flash"),
      session        = require("express-session"),
      moment         = require("moment"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override");
      User           = require("./models/user");

// connect to the DB
//let url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v13"; // fallback in case global var not working
//mongoose.connect(url, {useMongoClient: true});
mongoose.connect("mongodb://localhost/Eprep", { useNewUrlParser: true },function(err,res){
    if(err){
        console.log("Database Connection Failed");
    }
    else{
        console.log("Successfully connected to Databse");
    }
});

app.set("view engine", "ejs");
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment; // create local variable available for the application

//passport configuration
app.use(session({
  //secret: "process.env.SESSIONSECRET",
  secret: "this is not a good idea to put secret key in the main source code, its better to put this key in .env file",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser to all routes

app.use((req, res, next) => {
    res.locals.currentUser = req.user; // req.user is an authenticated user
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//=============Routes=============================
app.get('/', (req, res) => res.render('landing'));
app.get('/home', (req, res) => res.render('home',{page:'home'}));
app.get('/register', (req, res) => res.render('register',{page:'register'}));
app.get('/login', (req, res) => res.render('login',{page:'login'}));





//app.listen(process.env.PORT, process.env.IP, () => console.log("The YelpCamp Server Has Started!"));
app.listen(4545, () => console.log("E-prep server has started"));