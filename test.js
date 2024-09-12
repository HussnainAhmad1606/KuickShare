const crypto = require('crypto');
const key = crypto.randomBytes(32); // Generate a 256-bit key
console.log(key.toString('base64'));