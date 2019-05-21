var express = require('express');
var fs = require('fs');
var monitors = require('./json/monitors');
var referrals = require('./json/referrals');


var app = express();

//TODO: cite
//https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs
var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  helpers: { // adding helper
    inc: function(value, options) {
      return parseInt(value) + 1;
    }
  }
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// important for getting CSS
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/attendance',function(req,res){
  var context = {};
  context.all_referrals = referrals.all_referrals;

  res.render('attendance', context);
});

app.get('/email', function(req,res){
  var context = {};
  context.all_monitors = monitors.all_monitors;
  context.all_referrals = referrals.all_referrals;
  res.render('email', context);
});

app.get('/referral', function(req,res){
  res.render('referral');
});

// app.post('/referral', function(req,res){
  //referrals.all_referrals[0].student.name = {"first":"Sally", "last": "Espinoza"};
//   res.render('refer-submit');
// });

app.get('/referral/submit', function(req,res){
  res.render('refer-submit');
});

// TODO: do it or delete it
// app.use(function(req,res){
//   res.status(404);
//   res.render('404');
// });

// TODO: do it or delete it
// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.type('plain/text');
//   res.status(500);
//   res.render('500');
// });

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
