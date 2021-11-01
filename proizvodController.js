const mongoose = require("mongoose");
const Proizvod = mongoose.model('Proizvod');


module.exports.dodaj = function (req, res) {
    var proizvod = new Proizvod();
    proizvod.naziv = req.body.naziv;
    proizvod.proizvodjac = req.body.proizvodjac;
    proizvod.kolicina = req.body.kolicina;
    proizvod.prosek = 0;
    proizvod.uk_ocena = 0;
    proizvod.br_ocena = 0;
    proizvod.cena = req.body.cena;
    proizvod.tip = req.body.tip;
    proizvod.dani = req.body.dani;
    Proizvod.findOne({naziv: proizvod.naziv, proizvodjac: proizvod.proizvodjac}).then(
        async proi =>{
            if(proi == null){
                try{
                    await proizvod.save();
                    res.json({ msg: "Dodavanje proizvoda je uspelo." })
                }
                catch(err){
                    res.json({ msg: "Dodavanje proizvoda nije uspelo." })
                }
            }
            else{
                res.status(401).json({ error: "Preduzece vec ima proizvod sa ovim nazivom." });
            }
        }
    );
};

module.exports.getAll = (req, res, next) => {
    Proizvod.find().then(
        proizvodi => {
            if (!proizvodi) {
                return res.status(404).json("Nema proizvoda");
            }
            return res.status(200).json(proizvodi);
        }
    );
}

module.exports.getAllFromPreduzece = (req, res, next) => {
    Proizvod.find({proizvodjac : req.params.proizvodjac}).then(
        proizvodi => {
            if (!proizvodi) {
                return res.status(404).json("Nema proizvoda");
            }
            return res.status(200).json(proizvodi);
        }
    );
}

module.exports.getProizvod = (req, res, next) => {
    Proizvod.findOne({proizvodjac : req.params.proizvodjac, naziv: req.params.naziv}).then(
        proizvod => {
            if (!proizvod) {
                return res.status(404).json("Nema proizvoda");
            }
            return res.status(200).json(proizvod);
        }
    );
}

module.exports.umanji = (req, res, nex) => {
    Proizvod.findOne({naziv:req.body.naziv, proizvodjac:req.body.proizvodjac }).then(
        async proi => {
            if (proi != null) {
                proi.kolicina = proi.kolicina - req.body.num;
                try {
                    await proi.save();
                    return res.status(200).json({ msg: "Kolicina umanjena" });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo umanjivanje kolicine.' });
                }
            }
            else {
                return res.status(400).json({ error: "Proizvod ne postoji." });
            }
        }
    );
}

module.exports.uvecaj = (req, res, nex) => {
    Proizvod.findOne({naziv:req.body.naziv, proizvodjac:req.body.proizvodjac }).then(
        async proi => {
            if (proi != null) {
                proi.kolicina = proi.kolicina + req.body.num;
                try {
                    await proi.save();
                    return res.status(200).json({ msg: "Kolicina umanjena" });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo umanjivanje kolicine.' });
                }
            }
            else {
                return res.status(400).json({ error: "Proizvod ne postoji." });
            }
        }
    );
}

module.exports.deletePred = (req, res, nex) => {
    Proizvod.deleteMany({ proizvodjac: req.params.proizvodjac }).then(
        magacin => {
            if (magacin != null) {
                return res.status(200).json({ msg: "Svi proizvodi proizvodjaca su obrisani." });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje proizvoda proizvodjaca.' });
            }
        }
    );
}