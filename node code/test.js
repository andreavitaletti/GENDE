var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')

var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/feedback', function (req, res) {
  var cookie = req.cookies.cookieName;
  console.log('Hai selezionato '+ req.query.val);
  
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
    res.redirect('/unknown');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
    res.redirect('/known');
  } 
  //res.send('Hai selezionato '+ req.query.val)
})

app.get('/known', function (req, res) {
	res.send('Ti conosco');
})
	
app.get('/unknown', function (req, res) {
	res.send('Non ti conosco');
})

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

/*
// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});
*/
