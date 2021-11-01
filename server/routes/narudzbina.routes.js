const express = require('express');
const router = express.Router();
const narudzbinaCtrl = require('../controllers/narudzbinaController');

router.post('/dodaj', narudzbinaCtrl.dodaj);
router.get('/dohvatiPr/:proizvodjac',narudzbinaCtrl.getAllFromPreduzece);
router.get('/dohvatiNC/:proizvodjac', narudzbinaCtrl.getAllNotCanceled);
router.get('/dohvatiPo/:poljoprivrednik', narudzbinaCtrl.getAllFromPoljoprivrednik);
router.delete('/obrisi/:num', narudzbinaCtrl.delete);
router.delete('/obrisiPo/:poljoprivrednik', narudzbinaCtrl.deletePolj);
router.delete('/obrisiPr/:proizvodjac', narudzbinaCtrl.deletePred);
router.put('/status', narudzbinaCtrl.changeStatus);
router.get('/dohvatiSledNum', narudzbinaCtrl.nextNum);



module.exports = router;