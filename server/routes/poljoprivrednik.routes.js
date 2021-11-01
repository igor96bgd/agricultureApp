const express = require('express');
const router = express.Router();
const poljoprivrednikCtrl = require('../controllers/poljoprivrednikController');

router.post('/register', poljoprivrednikCtrl.register);
router.post('/login', poljoprivrednikCtrl.login);
//proveri da li je ok da stoji konkretno username ili ce morati
//da se zove isto kao i u modelu
//i vidi da li ces preko username dohvatai
//ali 99.9% je ovo poslednjje skroz ok
router.get('/:korisnicko_ime',poljoprivrednikCtrl.getPoljoprivrednik);

router.put('/lozinka', poljoprivrednikCtrl.changePass);

module.exports = router;