const mongoose = require("mongoose");
const Magacin = mongoose.model('Magacin');


module.exports.dodaj = function (req, res) {
    var magacin = new Magacin();
    magacin.naziv = req.body.naziv;
    magacin.proizvodjac = req.body.proizvodjac;
    magacin.kolicina = req.body.kolicina;
    magacin.poljoprivrednik =  req.body.poljoprivrednik;
    magacin.tip = req.body.tip;
    magacin.dani = req.body.dani;
    Magacin.findOne({naziv: magacin.naziv, proizvodjac: magacin.proizvodjac, poljoprivrednik:magacin.poljoprivrednik}).then(
        async mag =>{
            if(mag == null){
                try{
                    await magacin.save();
                    res.json({ msg: "Dodavanje proizvoda u magacin je uspelo." })
                }
                catch(err){
                    res.json({ msg: "Dodavanje proizvoda u magacin nije uspelo." })
                }
            }
            else{
                mag.kolicina = mag.kolicina + magacin.kolicina;
                try{
                    await mag.save();
                    res.json({ msg: "Uvecanje kolicine proizvoda u magacinu je uspelo." })
                }
                catch(err){
                    res.json({ msg: "Uvecanje kolicine proizvoda u magacinu nije uspelo." })
                }
            }
        }
    );
};

module.exports.get = (req, res, next) => {
    Magacin.find({poljoprivrednik : req.params.poljoprivrednik}).then(
        magacini => {
            if (!magacini) {
                return res.status(404).json("Poljoprivrednik nema proizvoda u magacinu.");
            }
            return res.status(200).json(magacini);
        }
    );
}

module.exports.getSadnice = (req, res, next) => {
    Magacin.find({poljoprivrednik : req.params.poljoprivrednik, tip:"sadnica"}).then(
        magacini => {
            if (!magacini) {
                return res.status(404).json("Poljoprivrednik nema proizvoda u magacinu.");
            }
            return res.status(200).json(magacini);
        }
    );
}

module.exports.getPreparati = (req, res, next) => {
    Magacin.find({poljoprivrednik : req.params.poljoprivrednik, tip:"preparat"}).then(
        magacini => {
            if (!magacini) {
                return res.status(404).json("Poljoprivrednik nema preparata u magacinu.");
            }
            return res.status(200).json(magacini);
        }
    );
}

module.exports.umanji = (req, res, nex) => {
    Magacin.findOne({ poljoprivrednik: req.body.poljoprivrednik, proizvodjac: req.body.proizvodjac, naziv:req.body.naziv }).then(
        async pr => {
            if (pr != null) {
                pr.kolicina--;
                try {
                    await pr.save();
                    return res.status(200).json({ msg: 'Uspesno umanjena kolicina.' });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo umanjenje kolicine.' });
                }
            }
            else {
                return res.status(400).json({ error: "Poljoprivrednik nema ovakav proizvod u svom magacinu" });
            }
        }
    );
}

module.exports.delete = (req, res, nex) => {
    Magacin.deleteOne({poljoprivrednik: req.params.poljo, proizvodjac: req.params.proi, naziv:req.params.naziv}).then(
        magacin => {
            if (magacin != null) {
                return res.status(200).json({ msg: "Uspelo brisanje proizvoda iz magacina" });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje proizvoda iz magacina.' });
            }
        }
    );
}

module.exports.deletePoljoprivrednik = (req, res, nex) => {
    Magacin.deleteMany({ poljoprivrednik: req.params.vlasnik }).then(
        magacin => {
            if (magacin != null) {
                return res.status(200).json({ msg: "Svi proizvodi poljoprivrednika iz magacina su obrisani." });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje proizvoda iz magacina.' });
            }
        }
    );
}