const crypto = require('crypto');
//const rsaKeygen = require('rsa-keygen');
const CryptoModel = require('../models/cryptoModel');

// AES Encryption/Decryption
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function aesEncrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

 function aesDecrypt(encryptedData, iv) {
     let ivBuffer = Buffer.from(iv, 'hex');
     let encryptedText = Buffer.from(encryptedData, 'hex');
     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
     let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
     return decrypted.toString();
 }

// // SHA-2 Hashing
 function sha256Hash(text) {
     return crypto.createHash('sha256').update(text).digest('hex');
 }

 // RSA Key Generation
 async function generateRSAKeys() {
     return new Promise((resolve, reject) => {
         rsaKeygen.generateKeyPair((err, keyPair) => {
             if (err) return reject(err);
             resolve(keyPair);
         });
     });
 }

 // RSA Encryption/Decryption
 function rsaEncrypt(publicKey, text) {
     const buffer = Buffer.from(text, 'utf-8');
     const encrypted = crypto.publicEncrypt(publicKey, buffer);
     return encrypted.toString('base64');
 }

 function rsaDecrypt(privateKey, encryptedText) {
     const buffer = Buffer.from(encryptedText, 'base64');
     const decrypted = crypto.privateDecrypt(privateKey, buffer);
     return decrypted.toString('utf-8');
 }

// Controller Functions
    exports.renderHome = async (req, res) => {
    const results = await CryptoModel.find({});
     res.render('index', { cryptodata: {}, results });
 };

 exports.aesEncrypt = async (req, res) => {
     const { text } = req.body;
     const encryptedData = aesEncrypt(text);
     await CryptoModel.create({ type: 'AES Encrypt', data: encryptedData.encryptedData });
     res.render('index', { cryptodata: { encryptedData } });
 };

 exports.aesDecrypt = async (req, res) => {
     const { encryptedData, iv } = req.body;
     const decryptedText = aesDecrypt(encryptedData, iv);
     await CryptoModel.create({ type: 'AES Decrypt', data: decryptedText });
     res.render('index', { cryptodata: { decryptedText } });
 };

 exports.sha256Hash = async (req, res) => {
     const { text } = req.body;
     const hashedText = sha256Hash(text);
     await CryptoModel.create({ type: 'SHA-256 Hash', data: hashedText });
     res.render('index', { cryptodata: { hashedText } });
 };

 exports.generateRSAKeys = async (req, res) => {
     try {
         const { publicKey, privateKey } = await generateRSAKeys();
         await CryptoModel.create({ type: 'RSA Keys', data: { publicKey, privateKey } });
         res.render('index', { cryptodata: { publicKey, privateKey } });
    } catch (err) {
         res.status(500).send(err.message);
     }
 };

 exports.rsaEncrypt = async (req, res) => {
     const { publicKey, text } = req.body;
     const encryptedText = rsaEncrypt(publicKey, text);
     await CryptoModel.create({ type: 'RSA Encrypt', data: encryptedText });
     res.render('index', { cryptodata: { encryptedText } });
 };

 exports.rsaDecrypt = async (req, res) => {
     const { privateKey, encryptedText } = req.body;
     const decryptedText = rsaDecrypt(privateKey, encryptedText);
     await CryptoModel.create({ type: 'RSA Decrypt', data: decryptedText });
     res.render('index', { cryptodata: { decryptedText } });
 };
