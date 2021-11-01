const express = require('express');
const router = express.Router();
const preduzeceCtrl = require('../controllers/preduzeceController');

router.post('/register', preduzeceCtrl.register);
router.post('/login', preduzeceCtrl.login);
//proveri da li je ok da stoji konkretno username ili ce morati
//da se zove isto kao i u modelu
//i vidi da li ces preko username dohvatai
//ali 99.9% je ovo poslednjje skroz ok
router.get('/:skr_naziv',preduzeceCtrl.getPreduzece);

router.put('/lozinka', preduzeceCtrl.changePass);
router.put('/kuriri', preduzeceCtrl.updateKuriri);

module.exports = router;