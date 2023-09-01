// kita bisa mengeksports function/varible/class/object/array dll dengan menggunakan modules.exports
const nama = "Ariel Rizki Muhtamad Bakri";
function cetakNama(nama){
    return `Hallo nama saya adalah ${nama}`;
}

const Mhs = {
    nama: "Najwah Khairyah Syabani",
    umur:17,
    cetakNama(){
        return `Hallo nama saya adalah ${this.nama} dan saya berumur ${this.umur}`;
    }
}

class Introduce {
    constructor() {
        console.log("Hallloooo ini adalah classs")
    }
}


module.exports = {
    nama:nama,
    cetakNama:cetakNama,
    mhs:Mhs,
    introduce:Introduce
}