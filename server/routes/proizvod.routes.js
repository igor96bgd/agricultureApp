const express = require('express');
const router = express.Router();
const proizvodCtrl = require('../controllers/proizvodController');

router.post('/dodaj', proizvodCtrl.dodaj);
router.get('/dohvatisve', proizvodCtrl.getAll);
router.get('/dohvati/:proizvodjac', proizvodCtrl.getAllFromPreduzece);
router.get('/dohvati/:proizvodjac/:naziv', proizvodCtrl.getProizvod);
router.put('/umanji', proizvodCtrl.umanji);
router.put('/uvecaj', proizvodCtrl.uvecaj);
router.delete('/obrisi/:proizvodjac', proizvodCtrl.deletePred);


module.exports = router;