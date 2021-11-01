//require('./config/config');
require('./models/db');

// importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var cron = require('node-cron');

var poljoprivrednik_routes = require('./routes/poljoprivrednik.routes');
var preduzece_routes = require('./routes/preduzece.routes');
var admin_routes = require('./routes/admin.routes');
var rasadnik_routes = require('./routes/rasadnik.routes');
var proizvod_routes = require('./routes/proizvod.routes');
var narudzbina_routes = require('./routes/narudzbina.routes');
var magacin_routes = require('./routes/magacin.routes');
const rasadnikCtrl = require('./controllers/rasadnikController');

var app = express();

cron.schedule('1 * * * *', () => {
    rasadnikCtrl.updateHourly();
});

cron.schedule('0 4 * * *', () => {
    rasadnikCtrl.updateDaily();
});


// port no
const port = 3000;

// adding middleware
app.use(cors());
app.use(bodyparser.json());

// static files
// IZOSTAVLJENO, VIDI DA LI JE UOPSTE POTREBNO

// routes
app.use('/poljoprivrednik', poljoprivrednik_routes);
app.use('/preduzece', preduzece_routes);
app.use('/admin', admin_routes);
app.use('/rasadnik', rasadnik_routes);
app.use('/proizvod', proizvod_routes);
app.use('/narudzbina', narudzbina_routes);
app.use('/magacin', magacin_routes);


// testing server
app.get('/', (req, res) => {
    res.send('foobar')
});

app.listen(port, () => {
    console.log("Server started at port: " + port);
});
