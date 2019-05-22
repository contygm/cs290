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

app.get('/attendance', function(req,res){
  var context = {};

  if(req.query.status) {
    context.all_referrals = referrals.all_referrals.filter(ref => ref.time_served.status === req.query.status);
  } else {
    context.all_referrals = referrals.all_referrals;
  }

  res.render('attendance', context);
});

app.post('/attendance', function(req,res){
  console.log("POST", req.body)
  req.body.refIds.forEach(id => {
    var ref = referrals.all_referrals.filter(ref => ref._id == id);
    console.log(id, ref)
    if (ref[0].time_served.status === "NOT_SERVED") {
      ref[0].time_served.status = "SERVED";
    } else {
      console.warn("ERROR: Status cannot be changed to SERVED for referral with id: " + id + ". Only NOT_SERVED referral can be updated to SERVED");
    }
  });

  res.render('attendance', referrals);
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

app.get('/referral/submit', function(req,res){
  res.render('refer-submit');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
