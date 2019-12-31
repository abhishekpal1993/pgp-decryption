const openpgp = require('openpgp');
const fs = require('fs');
const TextEncoder = require('text-encoding').TextEncoder;

let privkey;
let content;
const passphrase = '' //what the privKey is encrypted with

const decryptFunction = async() => {
    const privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0];
    
    const options = {
        message: await openpgp.message.read(content),
        privateKeys: [privKeyObj],
        armor: false

    };
    
    return openpgp.decrypt(options).then((plaintext) => {
        console.log(plaintext);
        return plaintext.data;
    });
}

// Promise.resolve(() => fs.readFileSync('./packt_gpg_private_key.asc'))
new Promise((resolve) => fs.readFile('./packt_gpg_private_key.asc', 'utf8', (err, contents) => {
    privkey = contents;
    resolve(privkey);
}))
.then((data) => {
    console.log('private key::', privkey);
})
.then(() => fs.readFileSync('./M092104575.PPR.pgp'))
.then((data) => {
    console.log('pgp file::', data);
    content = data;
})
.then(() => decryptFunction())
.then(() => {
    let test = (parseFloat(50).toFixed(2) * '100').toString().padStart(9, '0');
    let test1 = (parseFloat(50.090).toFixed(2) * '100').toString().padStart(9, '0');
    console.log(test);
    console.log(test1);
})
.catch((error) => console.error(error));
