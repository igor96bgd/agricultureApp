const mongoose = require('mongoose');

var SadnicaSchema = new mongoose.Schema({
    naziv:{
        type: String
    },
    proizvodjac:{
        type: String
    },
    dani:{
        type: Number
    },
    zavrseno:{
        type: Number
    },
    vadjenje:{
        type:Boolean
    },
    vreme:{
        type:String
    }
});

mongoose.model('Sadnica', SadnicaSchema, 'Sadnica');

const RasadnikSchema = mongoose.Schema({
    naziv:{
        type: String
    },
    mesto:{
        type: String
    },
    duzina:{
        type: Number
    },
    sirina:{
        type: Number
    },
    br_zauzeto:{
        type: Number
    },
    br_slobodno:{
        type: Number
    },
    voda:{
        type: Number
    },    
    temperatura:{
        type: Number
    },
    vlasnik:{
        type: String
    },
    sadnice: [SadnicaSchema]
});

mongoose.model('Rasadnik', RasadnikSchema, 'Rasadnik');