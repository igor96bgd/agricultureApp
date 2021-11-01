const mongoose = require("mongoose");


const Preduzece = mongoose.model('Preduzece');

module.exports.register = (req, res, next) => {
    var preduzece = new Preduzece();
    preduzece.pun_naziv = req.body.pun_naziv;
    preduzece.skr_naziv = req.body.skr_naziv;
    preduzece.lozinka = req.body.lozinka;
    preduzece.datum = req.body.datum;
    preduzece.mesto = req.body.mesto;
    preduzece.email = req.body.email;
    preduzece.approved = req.body.approved;
    preduzece.kuriri = [-1,-1,-1,-1,-1];
    Preduzece.findOne({ skr_naziv: preduzece.skr_naziv }).then(
        async pred => {
            if (pred == null) {
                try {
                    await preduzece.save();
                    res.json({ msg: "Registracije preduzeca uspela." });
                }
                catch (err) {
                    res.json({ msg: 'Registracija preduzeca nije uspela.' });
                }
            }
            else {
                res.status(401).json({ error: "Preduzece vec postoji." });
            }
        }
    );
}

module.exports.login = (req, res, next) => {
    Preduzece.findOne({ skr_naziv: req.body.skr_naziv }).then(
        preduzece => {
            if (preduzece == null) {
                return res.status(404).json("Ne postoji preduzece sa zadatim korisnickim imenom");
            }
            if (preduzece.lozinka != req.body.lozinka) {
                return res.status(404).json("Lozinka nije dobra");
            }
            return res.status(200).json(preduzece);
        }
    );
}

//najverovatnije preko korisnickog imena(tj skracenog naziva)
module.exports.getPreduzece = (req, res, next) => {
    Preduzece.findOne({ skr_naziv: req.params.skr_naziv }).then(
        preduzece => {
            if (!preduzece) {
                return res.status(404).json("Nema preduzeca sa zadatim korisnickim imenom.");
            }
            return res.status(200).json(preduzece);
        }
    );
}

module.exports.changePass = (req, res, nex) => {
    Preduzece.findOne({ skr_naziv: req.body.skr_naziv }).then(
        async pred => {
            if (pred != null) {
                pred.lozinka = req.body.lozinka;
                try {
                    await pred.save();
                    return res.status(200).json({ msg: "Promenjen pass preduzecu." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo menjanje passworda preduzecu.' });
                }
            }
            else {
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}

module.exports.updateKuriri = (req, res, nex) =>{
    Preduzece.findOne({ skr_naziv: req.body.skr_naziv }).then(
        async pred => {
            if (pred != null) {
                pred.kuriri = req.body.kuriri;
                try {
                    await pred.save();
                    return res.status(200).json({ msg: "Kuriri azurirani." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo azuriranje kurira.' });
                }
            }
            else {
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}