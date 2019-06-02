var express = require('express');
var mysql = require('./dbcon.js');

var app = express();

// Citation: Pulled customer helper from here
// https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs
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
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);


app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = [];
    for (row in rows) {
      let entry = {
        'id': rows[row].id,
        'name': rows[row].name, 
        'reps': rows[row].reps, 
        'weight': rows[row].weight, 
        'date':rows[row].date, 
        'lbs': rows[row].lbs ? true : false, 
      };

      context.results.push(entry);
    }
    console.log("YO BISH", context.results)
    res.render('home', context);
  });
});

app.get('/insert',function(req,res,next){
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", 
  [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.redirect("/");
  });
  
});

app.get('/delete',function(req,res,next){
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send({redirectUrl: "/"});
  });
});

app.get('/update',function(req,res,next){
  console.log("update", req.query)
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.result = {
        'id': rows[0].id,
        'name': rows[0].name, 
        'reps': rows[0].reps, 
        'weight': rows[0].weight, 
        'date':rows[0].date, 
        'lbs': rows[0].lbs ? true : false, 
    };

    console.log("update result", context.result)

    res.render('update', context.result)
  });
});


app.post('/update',function(req,res,next){
  if(result.length == 1){
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
      [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id],
      function(err, result){
      if(err){
        next(err);
        return;
      }
      res.redirect('/');
    });
  }
});


app.get('/reset-table',function(req,res,next){
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      res.redirect('/');
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
