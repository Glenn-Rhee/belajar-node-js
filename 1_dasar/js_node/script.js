// kita bisa membuat varible, function dll di script ini kemudian dipanggil di index.html
// caranya adalah dengan menggunakan module.exports
function sayHello(nama) {
    return `Hallo ${nama}`;
}

module.exports = {
    func: sayHello
}

// atau kita juga bisa menjalankan kedua function ini
console.log("INI HALAMAN SCRIPT");