// *** Express ***
const express = require('express');
const app = express();
// *** Database ***
const User = require('./db/user');
const Song = require('./db/song');
var path = require('path');

// *** Webpack ***
const env = require('./env/credentials.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require(`./webpack.config${env.prod ? '.prod' : ''}.js`);
const compiler = webpack(webpackConfig);

if (!env.prod) {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
    colors: true,
    },
    historyApiFallback: true,
  }));
}

//------------------------------TEAM LOCO-----------------------
// set views to look in the public directory
app.set('views', path.join(__dirname, 'src'));
// set app view engine html to render ejs files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//--------------------------------------------------------------

// *** Static Assets ***
// app.use(express.static(__dirname + '/src'));

// *** Parser ***
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const querystring = require('querystring');

// *** Session ***
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// *** Helper ***
const spotifyHelpers = require('./helpers/spotifyHelpers.js');
const locoHelpers = require('./helpers/locoHelpers.js');

// *** Routes ***

//------------------------------TEAM LOCO-----------------------
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});
var staticRouter = express.Router();
staticRouter.get('/', locoHelpers.handleGetRoot);
staticRouter.post('/locosignup', locoHelpers.handleSignup);
staticRouter.post('/locologin', locoHelpers.handleLogin);
staticRouter.get('/logout', locoHelpers.handleLogout);
app.use(staticRouter);
app.use(express.static(__dirname + '/src'));
//--------------------------------------------------------------

// fetch top 50 songs by netVoteCount from songs collection and send to client
app.get('/songs', (req, res) => {
  Song.find({}).sort({netVoteCount: 'descending'}).limit(50)
  .then((songs) => {
    res.json(songs);
  });
});

// fetch song research results and send to client
app.get('/songs/search', (req, res) => {
  spotifyHelpers.getTrackSearchResults(req.query.query)
  .then((results) => {
      res.json(results);
    });
});

// add song to both user collection and songs collection
app.post('/songs', (req, res) => {
  var newSong = new Song({
    name: req.body.name,
    image: req.body.image,
    link: req.body.link,
    userName: req.body.userName,
    artist: req.body.artist
  });
  User.findOne({name: req.body.userName})
  .then((user) => {
    if (user) {
      user.addedSongs.push(newSong);
      user.save();
      return newSong.save();
    }
  })
  .then(() => {
    res.sendStatus(201);
  });
});

// update vote on songs collection
app.put('/song', (req, res) => {
  Song.findOne({name: req.body.name})
  .then(function(song) {
    if (song) {
      if(req.body.vote > 0) {
        song.upVoteCount++;
      } else {
        song.downVoteCount++;
      }
      song.save();
      res.sendStatus(201);
    }
  });
});

// delete song from songs collection
app.delete('/song', (req, res) => {
  const songId = req.query.id;
  Song.remove({'_id': songId}, (err) => {
    if (err) { console.log(err); }
  });
  res.sendStatus(201);
});

// fetch all users from users collection and send to client
app.get('/users', (req,res) => {
  User.find({})
  .then((users) => {
    res.json(users);
  });
});

// add user to users collection
app.post('/signup', (req, res) => {
  var newUser = new User({
    name: req.body.username
  });
  console.log('user');
  User.findOne({name: req.body.username})
  .then((user) => {
    if (!user) {
      newUser.save()
      .then(() => {
        req.session.username = req.body.username;
        res.sendStatus(201);
      });
    } else {
      res.send('User already exist!');
    }
  });
});

// Host Authentication
app.get('/hostLogin', (req, res) => {
  spotifyHelpers.handleHostLogin(req, res);
});

app.get('/callback', (req, res) => {
  spotifyHelpers.redirectAfterLogin(req, res);
});

// send 404 to client
app.get('/*', (req, res) => {
  res.status(404).send('Not Found');
});

// *** Server ***
const server = app.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
});

