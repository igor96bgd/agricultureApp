const mongoose = require("mongoose");


const Poljoprivrednik = mongoose.model('Poljoprivrednik');
const Preduzece = mongoose.model('Preduzece');

//vidi da li je uopste potreban uslov if(poljoprivrednici.length>0) isto vazi i za preduzeca
module.exports.getRegistrationsPo = (req, res, next) => {
    Poljoprivrednik.find({ approved: 0 }).then(
        poljoprivrednici => {
            if (!poljoprivrednici) {
                return res.status(404).json("Nema poljoprivrednika sa zadatim korisnickim imenom.");
            }
            return res.status(200).json(poljoprivrednici);
        }
    );
}

module.exports.getRegistrationsPr = (req, res, next) => {
    Preduzece.find({ approved: 0 }).then(
        preduzeca => {
            if (!preduzeca) {
                return res.status(404).json("Nema preduzeca sa zadatim korisnickim imenom.");
            }
            return res.status(200).json(preduzeca);
        }
    );
}

module.exports.approveRegistrationPo = (req, res, nex) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.body.korisnicko_ime }).then(
        async polj => {
            if (polj != null) {
                polj.approved = 1;
                try {
                    await polj.save();
                    return res.status(200).json({ msg: "Poljoprivrednik odobren." });
                }
                catch (err) {
                    console.log('2');
                    return res.status(404).json({ msg: 'Nije uspelo odobravanje zahteva poljoprivredniuku.' });
                }
            }
            else {
                console.log('3');
                return res.status(400).json({ error: "Poljoprivrednik ne postoji." });
            }
        }
    );
}

module.exports.approveRegistrationPr = (req, res, nex) => {
    Preduzece.findOne({ skr_naziv: req.body.skr_naziv }).then(
        async pred => {
            if (pred != null) {
                pred.approved = 1;
                try {
                    await pred.save();
                    return res.status(200).json({ msg: "Preduzece odobreno." });
                }
                catch (err) {
                    console.log('2');
                    return res.status(404).json({ msg: 'Nije uspelo odobravanje zahteva preduzecu.' });
                }
            }
            else {
                console.log('3');
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}

module.exports.disapproveRegistrationPo = (req, res, nex) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.body.korisnicko_ime }).then(
        async polj => {
            if (polj != null) {
                try {
                    await polj.remove();
                    return res.status(200).json({ msg: "Poljoprivrednik obrisan." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo brisanje zahteva poljoprivredniku.' });
                }
            }
            else {
                return res.status(400).json({ error: "Poljoprivrednik ne postoji." });
            }
        }
    );
}

module.exports.disapproveRegistrationPr = (req, res, nex) => {
    Preduzece.findOne({ skr_naziv: req.body.skr_naziv }).then(
        async pred => {
            if (pred != null) {
                try {
                    await pred.remove();
                    return res.status(200).json({ msg: "Preduzece obrisano." });
                }
                catch (err) {
                    console.log('2');
                    return res.status(404).json({ msg: 'Nije uspelo brisanje zahteva preduzecu.' });
                }
            }
            else {
                console.log('3');
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}

module.exports.deletePo = (req, res, nex) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.params.korisnicko_ime }).then(
        async polj => {
            if (polj != null) {
                try {
                    await polj.remove();
                    return res.status(200).json({ msg: "Poljoprivrednik obrisan." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo brisanje poljoprivrednika.' });
                }
            }
            else {
                return res.status(400).json({ error: "Poljoprivrednik ne postoji." });
            }
        }
    );
}

module.exports.deletePr = (req, res, nex) => {
    console.log(req.param.skr_naziv);
    Preduzece.findOne({ skr_naziv: req.params.skr_naziv }).then(
        async pred => {
            if (pred != null) {
                try {
                    await pred.remove();
                    return res.status(200).json({ msg: "Preduzece obrisano." });
                }
                catch (err) {
                    console.log('2');
                    return res.status(404).json({ msg: 'Nije uspelo brisanje preduzeca.' });
                }
            }
            else {
                console.log('3');
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}

module.exports.updatePo = (req, res, nex) => {
    Poljoprivrednik.findOne({ korisnicko_ime: req.body.old_korisnicko_ime }).then(
        async polj => {
            if (polj != null) {
                polj.ime = req.body.ime;
                polj.prezime = req.body.prezime;
                polj.korisnicko_ime = req.body.korisnicko_ime;
                polj.lozinka = req.body.lozinka;
                polj.datum = req.body.datum;
                polj.mesto = req.body.mesto;
                polj.telefon = req.body.telefon;
                polj.email = req.body.email;
                polj.approved = req.body.approved;
                try {
                    await polj.save();
                    return res.status(200).json({ msg: "Poljoprivrednik azuriran." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo azuriranje poljoprivrednika.' });
                }
            }
            else {
                return res.status(400).json({ error: "Poljoprivrednik ne postoji." });
            }
        }
    );
}

module.exports.updatePr = (req, res, nex) => {
    Preduzece.findOne({ skr_naziv: req.body.old_skr_naziv }).then(
        async pred => {
            if (pred != null) {
                pred.pun_naziv = req.body.pun_naziv;
                pred.skr_naziv = req.body.skr_naziv;
                pred.lozinka = req.body.lozinka;
                pred.datum = req.body.datum;
                pred.mesto = req.body.mesto;
                pred.email = req.body.email;
                pred.approved = req.body.approved;
                try {
                    await pred.save();
                    return res.status(200).json({ msg: "Preduzece azurirano." });
                }
                catch (err) {
                    return res.status(404).json({ msg: 'Nije uspelo azuriranje preduzeca.' });
                }
            }
            else {
                return res.status(400).json({ error: "Preduzece ne postoji." });
            }
        }
    );
}