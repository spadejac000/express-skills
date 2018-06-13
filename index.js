var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  // TODO: Add links to index.html so users can navigate
  res.sendFile(__dirname + '/static/html/index.html');
});

app.get('/skills', function(req, res) {
  var skills = fs.readFileSync('./data.json');
  skills = JSON.parse(skills);
  console.log(skills);
  // TODO: Render this array of skills into an EJS template
  res.render('skills', {skills: skills});
});

// TODO: Add GET route that returns static page containing a form

app.get('/form', function(req, res) {
  res.sendFile(__dirname + '/static/html/form.html');
});

// TODO: Add POST route that writes new skill to the file, redirects to skills index
// TODO: Form should have action='/skills' and method='POST'

app.post('/skills', function(req, res) {
  var skills = fs.readFileSync('./data.json');
  skills = JSON.parse(skills);
  skills.push({name: req.body.name, level: req.body.level});
  fs.writeFileSync('./data.json', JSON.stringify(skills));
  res.redirect('/skills');
});

app.listen(process.env.PORT || 3000);
