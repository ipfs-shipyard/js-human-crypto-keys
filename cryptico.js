var cryptico = require("cryptico");

// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "3213213432432432lç43lk543jk421321321312r4325çlm4356l45m4ç3Th432432423e Moon is a Harsh Mistress."; 

// The length of the RSA key, in bits.
var Bits = 2048; 

var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

console.log(MattsRSAkey);
