const mongoose = require("mongoose");
const Poljoprivrednik = mongoose.model('Poljoprivrednik');



// proveri da li radi, ako ne treba jos malo da se doradi
// ipak dodato u save (err,doc)
module.exports.register = function (req, res) {
    var poljoprivrednik = new Poljoprivrednik();
    poljoprivrednik.ime = req.body.ime;
    poljoprivrednik.prezime = req.body.prezime;
    poljoprivrednik.telefon = req.body.telefon;
    poljoprivrednik.korisnicko_ime = req.body.korisnicko_ime;
    poljoprivrednik.lozinka = req.body.lozinka;
    poljoprivrednik.email = req.body.email;
    poljoprivrednik.datum = req.body.datum;
    poljoprivrednik.mesto = req.body.mesto;
    poljoprivrednik.approved = req.body.approved;
    Poljoprivrednik.findOne({ korisnicko_ime: poljoprivrednik.korisnicko_ime }).then(
        async polj => {
            if (polj == null) {
                try {
                    await poljoprivrednik.save();
                    res.json({ msg: "Registracije poljoprivrednika uspela." });
                }
                catch (err) {
                    res.json({ msg: 'Registracija poljoprivrednika nije uspela.' });
                }
            }
            else {
                res.status(401).json({ error: "Poljoprivrednik vec postoji." });
            }
        }
    );
};


//obrati paznju kako ces slati req. parametre
module.exports.login = (req, res, next) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.body.korisnicko_ime }).then(
        poljoprivrednik => {
            if (poljoprivrednik == null) {
                return res.status(404).json("Ne postoji poljoprivrednik sa zadatim korisnickim imenom");
            }
            if (poljoprivrednik.lozinka != req.body.lozinka) {
                return res.status(404).json("Lozinka nije dobra");
            }
            return res.status(200).json(poljoprivrednik);
        }
    );
}

//najverovatnije preko korisnickog imena
//vidi da li sme da stoji korisnicko ime u req.params.korisniko jer
//je u req naznaceno da je to username (vidi poljo.routes)
module.exports.getPoljoprivrednik = (req, res, next) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.params.korisnicko_ime }).then(
        poljoprivrednik => {
            if (!poljoprivrednik) {
                return res.status(404).json("Nema poljoprivrednika sa zadatim korisnickim imenom.");
            }
            return res.status(200).json(poljoprivrednik);
        }
    );

}

module.exports.changePass = (req, res, nex) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.body.korisnicko_ime }).then(
        async poljo => {
            if (poljo != null) {
                poljo.lozinka = req.body.lozinka;
                try {
                    await poljo.save();
                    return res.status(200).json({ msg: "Promenjen pass poljoprivrendiku." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo menjanje passworda poljoprivredniku.' });
                }
            }
            else {
                return res.status(400).json({ error: "Poljoprivrednik ne postoji." });
            }
        }
    );
}