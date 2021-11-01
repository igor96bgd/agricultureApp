const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');

// dohvatanje svih neodobrenih zahteva za registraciju
// od strane poljoprivrednika
router.get('/zahtevipo', adminCtrl.getRegistrationsPo);

// dohvatanje svih neodobrenih zahteva za registraciju
// od strane poljoprivrednika
router.get('/zahtevipr', adminCtrl.getRegistrationsPr);

router.put('/prihvacenpo', adminCtrl.approveRegistrationPo);
router.put('/prihvacenopr', adminCtrl.approveRegistrationPr);
router.put('/odbijenpo', adminCtrl.disapproveRegistrationPo);
router.put('/odbijenopr', adminCtrl.disapproveRegistrationPr);

router.put('/updatepo', adminCtrl.updatePo);
router.put('/updatepr', adminCtrl.updatePr);

router.delete('/obrisipo/:korisnicko_ime', adminCtrl.deletePo);
router.delete('/obrisipr/:skr_naziv', adminCtrl.deletePr);

module.exports = router;
