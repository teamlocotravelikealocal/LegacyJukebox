const bcrypt = require('bcrypt-nodejs');
const User = require('../db/user');

exports.handleGetRoot = function(req, res) {
  var name = 'not logged in';
  if (req.session.user){
    name = req.session.user;
  }
  //pass the username from the session to index.html
  //to have access to usename on the client side
  res.render('index', {data:name});
}

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function() {
    req.session.user = newUser;
    res.redirect('/');
  });
};

  
exports.handleLogin = function(req, res) {
  var name = req.body.username;
  var password = req.body.password;
  User.findOne({name:name}, function(error, user){
    if (error) {
      console.log(err);
    } else {
      if (user) {
        bcrypt.compare(password, user.password, function(err, result){
          if (err) {
            console.log(err);
          } else {
            if (result) {
              exports.createSession(req, res, user.name);
            } else {
              console.log('Wrong username or password!');
              res.redirect('locologin.html');
            }
          }
        });
      } else {
        res.redirect('locosignup.html');
      }
    }
  });
};
  
  
exports.handleSignup = function(req, res) {
  var name = req.body.username;
  var password = req.body.password;
  // console.log(name, password);
  var hash = bcrypt.hashSync(password);
  User.findOne({name:name}, function(error, user){
    if (error) {
      console.log(error);
    } else if (user) {
      // console.log('User already exists!');
      res.redirect('locologin.html');
    } else {
      var newUser = new User({name: name, password: hash});
      newUser.save(function(error, newUser){
        if (error) {
          console.log(error);
          res.send('Error while saving new user');
        } else {
          exports.createSession(req, res, name);
        }
      });
    }
  });
};
  
exports.handleLogout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
};