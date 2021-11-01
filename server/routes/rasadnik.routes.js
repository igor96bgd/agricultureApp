const express = require('express');
const router = express.Router();
const rasadnikCtrl = require('../controllers/rasadnikController');


router.post('/dodaj', rasadnikCtrl.dodaj);
router.get('/dohvatisve/:vlasnik', rasadnikCtrl.getRasadnikByPolj);
router.get('/dohvati/:naziv/:vlasnik', rasadnikCtrl.getRasadnik);
router.delete('/obrisi/:vlasnik', rasadnikCtrl.delete);
router.put('/update', rasadnikCtrl.update);
router.put('/dodajSadnicu', rasadnikCtrl.dodajSadnicu);
router.put('/primeniPreparat', rasadnikCtrl.primeniPreparat);

module.exports = router;