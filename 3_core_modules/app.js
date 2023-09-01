const fs = require("fs");
const { stdin, stdout } = require("process");

// membuat directory mengguanakn fungsi mkdir
// fs.mkdir('cobaaa', (err) => {
//     (err) ? console.log(err) : console.log("Direktori baru berhasil dibuat");
// })

// Membuat text baru menggunakan fungsi fungsi writeFile 
// fs.writeFile('cobaaa/text.txt', "Ini textt baruu ceritanya", (err) => {
//     if(err) throw err;
//     console.log("Text berhasil dibuat");
// })


// Membaca isi file menggunakan fungsi fs.readfile
// fs.readFile('data/text.txt','utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })


// prompt 
const readline = require('readline');
const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

// rl.question("Siapakah namamu ? ", (nama)=>{
//     rl.question("Berapa umurmu ? ", (umur) =>{
//         let age = parseInt(umur);
//         let result = "";
//         (age < 18) ? result = "Wah ternyata kamu lebih muda ya" : result = "Wah kamu lebih tua dari aku ternyata";
//         console.log(`Hallo salam kenal ${nama}, oalah umur kamu tuh ${age} ${result}`);
//         rl.close();
//     })
// })


// Menampung data Mahasiswa kedalam json
rl.question("Masukkan Nama : ", (nama) => {
    rl.question("Masukkan jurusan : ", (jurusan) => {
        rl.question("Masukkan Email : ", (email) => {
            const data = {nama,jurusan,email};
            const result = fs.readFileSync("data/data.json","utf-8")
            const file = JSON.parse(result);
            file.push(data);
            fs.writeFile("data/data.json", JSON.stringify(file), (err)=>{
                if(err) throw err;
                console.log("Terimakasih telah menginputkan");
            });
            rl.close()
        })
    })
})