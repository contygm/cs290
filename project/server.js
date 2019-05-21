var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
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
  res.render('attendance');
});

app.get('/email', function(req,res){
  res.render('email');
});

app.get('/referral', function(req,res){
  res.render('referral');
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