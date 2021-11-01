const mongoose = require('mongoose');

const PreduzeceSchema = mongoose.Schema({
    pun_naziv:{
        type: String
    },
    skr_naziv:{
        type: String
    },
    lozinka:{
        type: String
    },
    datum:{
        type: String
    },
    mesto:{
        type: String
    },
    email:{
        type: String
    },
    approved:{
        type: Number
    },
    kuriri : [Number]
});

mongoose.model('Preduzece', PreduzeceSchema, 'Preduzece');