var express = require('express');
var fs = require('fs');
var monitors = require('./json/monitors');
var referrals = require('./json/referrals');

// TODO: log when hitting route
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

/* 
==================================
    ATTENDANCE ENDPOINTS 
==================================
*/
// gets all referals 
// OR filters referalls based on time_served.status
app.get('/attendance', function(req,res){
  var context = {};

  if(req.query.status) {
    context.all_referrals = referrals.all_referrals.filter(ref => ref.time_served.status === req.query.status);
  } else {
    context.all_referrals = referrals.all_referrals;
  }

  res.render('attendance', context);
});

// for marking students present/ detention served
app.post('/attendance-update', function(req,res){
  req.body.refIds.forEach(id => {
    var idx = referrals.all_referrals.findIndex((element) => element._id == id);
    var ref = referrals.all_referrals[idx];
    
    if (ref.time_served.status === "NOT_SERVED") {
      ref.time_served.status = "SERVED";
    } else {
      console.error("ERROR: Status cannot be changed to SERVED for referral with id: " + id + ". Only NOT_SERVED referral can be updated to SERVED");
    }
  });
});

/* 
==================================
    FILTER ENDPOINTS 
==================================
*/
app.get('/filter-students-by-id', function(req,res){
  // const ref= referrals.all_referrals.filter(ref => ref._id == req.query.id)[0];
  // body.send()
  res.send(referrals.all_referrals.filter(ref => ref._id == req.query.id)[0]);
  // return ref;
});

app.get('/filter-monitors-by-id', function(req,res){
  res.send(monitors.all_monitors.filter(mon => mon._id == req.query.id)[0]);
});

// filter endpoints
app.get('/filter-students-by-id', function(req,res){
  // const ref= referrals.all_referrals.filter(ref => ref._id == req.query.id)[0];
  // body.send()
  res.send(referrals.all_referrals.filter(ref => ref._id == req.query.id)[0]);
  // return ref;
});

app.get('/filter-both-by-id', function(req,res){
  const monitor = monitors.all_monitors.filter(mon => mon._id == req.query.monId)[0];
  const ref = referrals.all_referrals.filter(ref => ref._id == req.query.refId)[0];
  const resObj = {
    monitor: monitor,
    referral: ref,
  }
  
  res.send(resObj);
});

/* 
==================================
    EMAIL ENDPOINTS 
==================================
*/

app.get('/email', function(req,res){
  var context = {};
  context.all_monitors = monitors.all_monitors;
  context.served_referrals = referrals.all_referrals.filter(ref => ref.time_served.status === 'SERVED');
  res.render('email', context);
});

/* 
==================================
    REFERRAL ENDPOINTS 
==================================
*/

app.get('/referral', function(req,res){
  res.render('referral');
});

app.get('/referral/submit', function(req,res){
  res.render('refer-submit');
});

app.post('/newReferral', function(req,res){  
  // set id, then count, then add new ref
  req.body._id = referrals.referral_count;
  referrals.referral_count++;
  referrals.all_referrals.push(req.body)

  // res.redirect("/");
  res.send({redirectUrl: "/referral/submit"});
  // res.redirect('/referral/submit');
});

/* 
==================================
    ERRORS 
==================================
*/

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
