const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PIA2020Project', (err) => {
    if(!err){console.log('MongoDB connection OK');}
    else{console.log('MongoDB connection FAIL: ' + JSON.stringify(err,undifined,2));}
});

require('./poljoprivrednik');
require('./preduzece');
require('./rasadnik');
require('./proizvod');
require('./magacin');