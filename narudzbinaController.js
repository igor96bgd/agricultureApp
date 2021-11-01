const mongoose = require("mongoose");
const Narudzbina = mongoose.model('Narudzbina');

module.exports.dodaj = function (req, res) {
    var narudzbina = new Narudzbina();
    narudzbina.poljoprivrednik = req.body.poljoprivrednik;
    narudzbina.preduzece = req.body.preduzece;
    narudzbina.status = req.body.status;
    narudzbina.num = req.body.num;
    narudzbina.datum = req.body.datum;
    narudzbina.proizvodi = req.body.proizvodi;
    Narudzbina.findOne({num: narudzbina.num}).then(
        async nar => {
            if(nar == null){
                try{
                    await narudzbina.save();
                    res.json({ msg: "Dodavanje narudzbine je uspelo." })
                }
                catch(err){
                    res.json({ msg: "Dodavanje narudzbine nije uspelo." })
                }
            }
            else{
                res.status(401).json({ error: "Vec postoji narudzbina sa ovim rednim brojem!" });
            }
        }
    );
};

module.exports.getAllFromPreduzece = (req, res, next) => {
    Narudzbina.find({preduzece : req.params.proizvodjac, status:{$in:["Na Cekanju", "Isporuka u toku"]}}).then(
        narudzbine => {
            if (!narudzbine) {
                //return res.status(404).json("Nema narudzbina");
                return res.status(404).json(narudzbine);
            }
            return res.status(200).json(narudzbine);
        }
    );
}

module.exports.getAllNotCanceled = (req, res, next) => {
    Narudzbina.find({preduzece : req.params.proizvodjac, status:{$in:["Na Cekanju", "Isporuka u toku", "Isporucena"]}}).then(
        narudzbine => {
            if (!narudzbine) {
                return res.status(404).json(narudzbine);
            }
            return res.status(200).json(narudzbine);
        }
    );
}

module.exports.getAllFromPoljoprivrednik = (req, res, next) => {
    Narudzbina.find({poljoprivrednik : req.params.poljoprivrednik, status:{$in:["Na Cekanju", "Isporuka u toku"]}}).then(
        narudzbine => {
            if (!narudzbine) {
                return res.status(404).json("Nema narudzbina");
            }
            return res.status(200).json(narudzbine);
        }
    );
}

module.exports.delete = (req, res, nex) => {
    Narudzbina.findOne({ num: req.params.num }).then(
        async nar => {
            if (nar != null) {
                try {
                    await nar.remove();
                    return res.status(200).json({ msg: "Narudzbina obrisana." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo brisanje narudzbine.' });
                }
            }
            else {
                return res.status(400).json({ error: "Narudzbina ne postoji." });
            }
        }
    );
}

module.exports.changeStatus = (req, res, nex) => {
    Narudzbina.findOne({ num: req.body.num }).then(
        async nar => {
            if (nar != null) {
                nar.status = req.body.status;
                try {
                    await nar.save();
                    return res.status(200).json({ msg: "Promejnen status narudzbine." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo menjanje statusa narudzbine.' });
                }
            }
            else {
                return res.status(400).json({ error: "Narudzbina ne postoji." });
            }
        }
    );
}

module.exports.nextNum = (req, res, next) => {
    Narudzbina.find().then(
        narudzbine=>{
            if(!narudzbine){
                return res.status(404).json(narudzbine);
            }
            else{
                return res.status(200).json(narudzbine);
            }
        }
    );
}

module.exports.deletePolj = (req, res, nex) => {
    Narudzbina.deleteMany({ poljoprivrednik: req.params.poljoprivrednik, status:{$in:["Na Cekanju", "Isporuka u toku", "Nije Isporucena"]}}).then(
        nar => {
            if (nar != null) {
                return res.status(200).json({ msg: "Sve narudzbine poljoprivrednika koje nisu isporucene su obrisane." });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje narudzbina poljoprivrednika.' });
            }
        }
    );
}

module.exports.deletePred = (req, res, nex) => {
    Narudzbina.deleteMany({ preduzece: req.params.proizvodjac}).then(
        nar => {
            if (nar != null) {
                return res.status(200).json({ msg: "Sve narudzbine proizvodjaca su obrisane." });
            }
            else {
                return res.status(404).json({ msg: 'Nije uspelo brisanje narudzbina proizvodjaca.' });
            }
        }
    );
}