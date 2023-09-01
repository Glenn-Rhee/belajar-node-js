// kita bisa menginisasi semua script yang ada di file script.js menggunakan require. nantinya require ini bentuknya adalah object
const script = require("./script");


console.log(script.cetakNama(script.nama));

console.log(script.mhs.cetakNama());

const coba = new script.introduce();

console.log(coba);