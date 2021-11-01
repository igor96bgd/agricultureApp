const mongoose = require('mongoose');

const ProizvodSchema = mongoose.Schema({
    naziv:{
        type: String
    },
    proizvodjac:{
        type: String
    },
    kolicina:{
        type: Number
    },
    prosek:{
        type: Number
    },
    uk_ocena:{
        type: Number
    },
    br_ocena:{
        type: Number
    },
    cena:{
        type: Number
    },
    dani:{
        type: Number
    },
    tip:{
        type: String
    }
});

mongoose.model('Proizvod', ProizvodSchema, 'Proizvod');

var narudzbinaSchema = new mongoose.Schema({
    poljoprivrednik:{
        type: String
    },
    preduzece:{
        type: String
    },
    status:{
        type: String
    },
    num:{
        type: Number
    },
    datum:{
        type: String
    },
    proizvodi: [ProizvodSchema]
});

mongoose.model('Narudzbina', narudzbinaSchema, 'Narudzbina');

