var express = require('express');
var path = require('path');
var JsonDB = require('node-json-db');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Define the port to run on
app.set('port', 3000);

app.set('view engine', 'pug')


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

var db = new JsonDB("../genetic/06112017generation0", true, false);
var db_users = new JsonDB("../users/users", true, false);


var data = db.getData("/");

var to_be_done = data.combinations;
var generation = data.generation;


app.get('/start', function (req, res) {
  var i = to_be_done.pop();
  res.redirect("http://localhost:3000/boot/index.html?inst="+JSON.stringify(i));
})

/*
app.get('/test_view', function (req, res) {
  //res.render('index', { title: 'Hey', message: 'Hello there!' })
  res.render('data2', { title: 'Hey', userid: 512342 })
})
*/
app.post('/register', function (req, res) {
  var ddd = req.body;
  try {
  var data = db_users.getData("/users/"+ddd.id);
  db_users.push("/users/"+ddd.id+"/feedback[]",{"generation":ddd.generation,"choice":ddd.choice},true);
  } catch(error) {
  //The error will tell you where the DataPath stopped. In this case test1
  //Since /test1/test does't exist.
      console.error(error);
      db_users.push("/users/"+ddd.id,{"gender":ddd.gender,"age":ddd.age,"email":ddd.email});
      db_users.push("/users/"+ddd.id+"/feedback[0]", {"generation":ddd.generation,"choice":ddd.choice}, true);
  }
  // res.send(ddd);
  // dd = {"gender":"maschio","age":"34","email":"a@b.c","id":"44155155145563185","generation":"0","choice":"6"}
  var i = to_be_done.pop();
  res.redirect("http://localhost:3000/showandselect.html?inst="+JSON.stringify(i));
})

app.get('/', function (req, res) {
  var i = to_be_done.pop();
  res.redirect("http://localhost:3000/boot/index.html?inst="+JSON.stringify(i));
})


app.get('/show_items', function (req, res) {
  var i = to_be_done.pop();
  res.redirect("http://localhost:3000/showandselect.html?inst="+JSON.stringify(i));
})

app.get('/feedback', function (req, res) {
  var cookie = req.cookies.cookieName;
  var choice = req.query.val;
  console.log('Hai selezionato '+ choice);
  var cf = data.population[choice].positive_feedback;
  console.log('current feedback for choice '+ cf);
  db.push("/population["+choice+"]/positive_feedback",cf+1);

  if (cookie === undefined)
  {
    // no: set a new cookie --> new user
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
    res.render('data2', { "generation":generation, "choice": choice, "userid": randomNumber })
  }
  else
  {
    // yes, cookie was already present --> old user
    console.log('cookie exists', cookie);
    db_users.push("/users/"+cookie+"/feedback[]",{"generation":generation,"choice":choice},true);
    var i = to_be_done.pop();
    res.redirect("http://localhost:3000/showandselect.html?inst="+JSON.stringify(i));
  }
  //res.send('Hai selezionato '+ req.query.val)
})

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
