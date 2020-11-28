const crypto = require("crypto") 

class encrypter {

    #keys = crypto.generateKeyPairSync("rsa", {modulusLength: 2048,})

    encrypt(data) {
        return crypto.publicEncrypt({key: this.getPublicKey(), padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256",},Buffer.from(data));
    }

    decrypt(data) {
        return crypto.privateDecrypt({key: this.#keys['privateKey'], padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256",},data).toString();
    }

    getPublicKey() {
        return this.#keys["publicKey"];
    }
}

module.exports = {
    encrypter
};
