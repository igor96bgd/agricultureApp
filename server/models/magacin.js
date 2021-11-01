const mongoose = require('mongoose');

const MagacinSchema = mongoose.Schema({
    naziv:{
        type: String
    },
    proizvodjac:{
        type: String
    },
    poljoprivrednik:{
        type: String
    },
    kolicina:{
        type: Number
    },
    dani:{
        type: Number
    },
    tip:{
        type: String
    }
});

mongoose.model('Magacin', MagacinSchema, 'Magacin');