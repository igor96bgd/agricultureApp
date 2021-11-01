const mongoose = require("mongoose");
const Rasadnik = mongoose.model('Rasadnik');


module.exports.dodaj = function (req, res) {
    var rasadnik = new Rasadnik();
    rasadnik.naziv = req.body.naziv;
    rasadnik.mesto = req.body.mesto;
    rasadnik.duzina = req.body.duzina;
    rasadnik.sirina = req.body.sirina;
    rasadnik.br_zauzeto = 0;
    rasadnik.br_slobodno = req.body.duzina * req.body.sirina;
    rasadnik.voda = 200;
    rasadnik.temperatura = 18;
    rasadnik.vlasnik = req.body.vlasnik;
    rasadnik.sadnice = req.body.sadnice;
    Rasadnik.findOne({ naziv: rasadnik.naziv, vlasnik: rasadnik.vlasnik }).then(
        async ras => {
            if (ras == null) {
                try {
                    await rasadnik.save();
                    res.json({ msg: "Dodavanje rasadnika je uspelo." })
                }
                catch (err) {
                    res.json({ msg: "Dodavanje rasadnika nije uspelo." })
                }
            }
            else {
                res.status(401).json({ error: "Poljoprivrednik vec ima rasadnik sa ovim nazivom." });
            }
        }
    );
};

module.exports.getRasadnikByPolj = (req, res, next) => {
    Rasadnik.find({ vlasnik: req.params.vlasnik }).then(
        rasadnici => {
            if (!rasadnici) {
                return res.status(404).json("Zadati poljoprivrednik nema rasadnike");
            }
            return res.status(200).json(rasadnici);
        }
    );
}

module.exports.getRasadnik = (req, res, next) => {
    Rasadnik.findOne({ naziv: req.params.naziv, vlasnik: req.params.vlasnik }).then(
        rasadnik => {
            if (!rasadnik) {
                return res.status(404).json("Zadati poljoprivrednik nema rasadnik sa zadatim nazivom.");
            }
            return res.status(200).json(rasadnik);
        }
    );
}

module.exports.delete = (req, res, nex) => {
    Rasadnik.deleteMany({ vlasnik: req.params.vlasnik }).then(
        rasadnici => {
            if (rasadnici != null) {
                return res.status(200).json({ msg: "Svi rasadnici poljoprivrednika su obrisani." });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje rasadnika.' });
            }
        }
    );
}

module.exports.updateHourly = (req, res, nex) => {
    Rasadnik.find().then(
        ras => {
            if (ras) {
                ras.forEach(async r => {
                    r.voda = r.voda - 1;
                    r.temperatura = r.temperatura - 0.5;
                    try {
                        await r.save();
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
            }
        }
    );
}


module.exports.updateDaily = (req, res, nex) => {
    Rasadnik.find().then(
        ras => {
            if (ras) {
                ras.forEach(async r => {
                    for(var i=0;i<r.sirina*r.duzina;i++){
                        if(r.sadnice[i]){
                            r.sadnice[i].zavrseno++;
                            if(r.sadnice[i].zavrseno>r.sadnice[i].dani){
                                r.sadnice[i].zavrseno=r.sadnice[i].dani;
                            }
                        }
                    }
                    try {
                        await r.save();
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
            }
        }
    );
}
module.exports.update = (req, res, nex) => {
    Rasadnik.findOne({ vlasnik: req.body.vlasnik, naziv: req.body.naziv }).then(
        async ras => {
            if (ras != null) {
                ras.voda = ras.voda + req.body.voda;
                ras.temperatura = ras.temperatura + req.body.temperatura;
                try {
                    await ras.save();
                    return res.status(200).json(ras);
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo azuriranje rasadnika.' });
                }
            }
            else {
                return res.status(400).json({ error: "Rasadnik ne postoji." });
            }
        }
    );
}

module.exports.dodajSadnicu = (req, res, nex) => {
    Rasadnik.findOne({ vlasnik: req.body.vlasnik, naziv: req.body.naziv }).then(
        async ras => {
            if (ras != null) {
                ras.sadnice = req.body.sadnice;
                ras.br_zauzeto += req.body.zauzeto;
                ras.br_slobodno += req.body.slobodno;
                try {
                    await ras.save();
                    return res.status(200).json(ras);
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo sadjenje.' });
                }
            }
            else {
                return res.status(400).json({ error: "Rasadnik ne postoji." });
            }
        }
    );
}

module.exports.primeniPreparat = (req, res, nex) => {
    Rasadnik.findOne({ vlasnik: req.body.vlasnik, naziv: req.body.naziv }).then(
        async ras => {
            if (ras != null) {
                ras.sadnice = req.body.sadnice;
                try {
                    await ras.save();
                    return res.status(200).json(ras);
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspela primena preparata.'});
                }
            }
            else {
                return res.status(400).json({ error: "Rasadnik ne postoji." });
            }
        }
    );
}

