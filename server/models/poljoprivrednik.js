const mongoose = require('mongoose');

var poljoprivrednikSchema = new mongoose.Schema({
    ime:{
        type: String
    },
    prezime:{
        type: String
    },
    korisnicko_ime:{
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
    telefon:{
        type: String
    },
    email:{
        type: String,
    },
    approved:{
        type: Number
    }
});
mongoose.model('Poljoprivrednik', poljoprivrednikSchema, 'Poljoprivrednik');
