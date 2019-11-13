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
      middleware     = require("./middleware")

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
appuse(methodOverride("_method"));
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
app.get('/contact_us',(req,res)=> res.render('contact',{page:'contact'}));
app.get('/about_us',(req,res)=> res.render('aboutus',{page:'about'}));
app.get('/exams',(req,res)=> res.render('exams',{page:'exam'}))





//post routers
app.post("/register", (req, res) => {
    let newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contributed: 0,
      appeared: 0,
      bio : req.body.bio,
      skills : req.body.skills
    });
    //change admin code as per your choice
    //we can make environment file as .env and can store hidden details like admin secret code
    if (req.body.adminCode === "123456") {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate email
          req.flash("error", "That email has already been registered.");
          return res.redirect("/register");
        } 
        // Some other error
        console.log(err);
        req.flash("error", "Something went wrong...");
        return res.redirect("/register");
      }
      
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to E-prep " + user.username);
        res.redirect("/home");
      });
    });
  });
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash("error", "Invalid username or password");
        return res.redirect('/login');
      }
      req.logIn(user, err => {
        if (err) { return next(err); }
        let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/home';
        delete req.session.redirectTo;
        req.flash("success", "Good to see you again, " + user.username);
        res.redirect(redirectTo);
      });
    })(req, res, next);
  });
  
  // logout route
  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out seccessfully. Look forward to seeing you again!");
    res.redirect("/home");
  });






  //======user routes================

  app.get("/users/:id", middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
      if (err || !foundUser) {
        req.flash("error", "Something went wrong...");
        res.redirect("/home");
      }else {
        res.render("users/show", { user: foundUser});
      }
    });
  });
  
  // show edit form
  app.get("/users/:id/edit", middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
      if (err || !foundUser) { return res.redirect("back"); }
      if (foundUser._id.equals(req.user._id)) {
        res.render("users/edit", { user: foundUser }); 
      } else {
        req.flash("error", "You don't have permission to do that");
        res.redirect("back");
      } 
    });
  });
  
  // update profile
  app.put("/users/:id", middleware.isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate email
          req.flash("error", "That email has already been registered.");
          return res.redirect("/users" + req.params.id);
        } 
        // Some other error
        req.flash("error", "Something went wrong...");
        return res.redirect("/users" + req.params.id);
      }
      if (updatedUser._id.equals(req.user._id)) {
        res.redirect("/users/" + req.params.id);
      } else {
        req.flash("error", "You don't have permission to do that");
        res.redirect("/home");
      }
    });
  });









//app.listen(process.env.PORT, process.env.IP, () => console.log("The e-prep Server Has Started!"));
app.listen(4545, () => console.log("E-prep server has started"));