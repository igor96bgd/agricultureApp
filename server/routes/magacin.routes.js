const express = require('express');
const router = express.Router();
const magacinCtrl = require('../controllers/magacinController');

router.post('/dodaj', magacinCtrl.dodaj);
router.get('/dohvati/:poljoprivrednik', magacinCtrl.get);
router.get('/dohvatiSadnice/:poljoprivrednik', magacinCtrl.getSadnice);
router.get('/dohvatiPreparate/:poljoprivrednik', magacinCtrl.getPreparati);
router.put('/umanji', magacinCtrl.umanji);
router.delete('/obrisi/:poljo/:proi/:naziv',magacinCtrl.delete);
router.delete('/obrisiPo/:vlasnik', magacinCtrl.deletePoljoprivrednik);

module.exports = router;