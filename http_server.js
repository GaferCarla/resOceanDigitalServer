const express = require('express');
const app     = express();
const low     = require('lowdb');
const fs      = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db      = low(adapter);
const cors    = require('cors');
const { faker } = require('@faker-js/faker');

// allow cross-origin resource sharing (CORS)
app.use(cors());

//data parse - used to parse post data
//al enviar (POST) solicitudes HTTP al servidor, necesitamos usar un EMPAQUETAR de manera diferente.
//bodyParser permite interpetar el código, extraer los datos
//EJEMPLO DE POST ROUTE
// app.post ('/test', function(req, res) {
//     console.log(requ.body.username, req.body.password);
// })
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
// -------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ users: []}).write();

// return all users
app.get('/data', function(req, res){     
    res.send(db.get('users').value());
});


//post route
app.post ('/test', function(req, res) {
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " "+ req.body.password)
})

// add user
app.post('/add', function(req, res){
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : faker.internet.avatar() 
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// start server
// -----------------------
app.listen(3000, function(){
    console.log('Running on port 3000!')
})
