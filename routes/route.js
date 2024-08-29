const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/', cryptoController.renderHome);
router.post('/aes/encrypt', cryptoController.aesEncrypt);
router.post('/aes/decrypt', cryptoController.aesDecrypt);
router.post('/sha256/hash', cryptoController.sha256Hash);
router.get('/rsa/generate', cryptoController.generateRSAKeys);
router.post('/rsa/encrypt', cryptoController.rsaEncrypt);
router.post('/rsa/decrypt', cryptoController.rsaDecrypt);

module.exports = router;
