const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const password = '12fdfdfdf';
const algorithm = 'aes128';

module.exports = function encrypt(pass) {
  let key = CryptoJS.PBKDF2(password, CryptoJS.SHA256('secret-password-dsd-daa'), { keySize: 256/32, iterations: 1000 });
  let cipher = crypto.createCipher(algorithm, key.toString(CryptoJS.enc.Base64));
  let crypted = cipher.update(pass,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};
