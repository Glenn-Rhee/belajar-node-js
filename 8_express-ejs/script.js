// versi express
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const { send } = require("process");
const app = express();
const port = 3000;
const fs = require("fs/promises");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    // untuk menggunakan ejs menggunakna syntax
    res.render("index", {
        nama: "Ariel",
        layout: "layouts/main-layout",
        title: "Halaman Index",
    });
});

const mahasiswa = [
    {
        nama: "Najwah Khairyah Syabani",
        jurusan: "Hubungan Internasional",
        email: "najwaks1909@gmail.com"
    },
    {
        nama: "Glenn rhee",
        jurusan: "Teknik Informatika",
        email: "glennviktor5@gmail.com"
    },
    {
        nama: "Ariel Rizki Muhtamad Bakri",
        jurusan: "Teknik Sipil",
        email: "arielrizki2005@gmail.com"
    },
    {
        nama: "Yusuf Habibie Setyo Nugroho",
        jurusan: "Ekonomi",
        email: "yusufhabibie@gmail.com"
    }

]

app.get("/about", (req, res) => {
    res.render("about", {
        layout: "layouts/main-layout",
        title: "Halaman About",
        mahasiswa
    });
})


app.get("/contact", (req, res) => {
    res.render("contact", {
        layout: "layouts/main-layout",
        title: "Halaman Contact",
        mahasiswa
    });
})

// menggunakan request
app.get("/produk/:id", (req, res) => {
    res.send(`Produk id :${req.params.id} <br> Category : ${req.query.category}`);
})

app.get("/detail", (req, res) => {
    res.sendFile(path.join(__dirname, "/Data/contacts.json"))
})

// cara menangani kasus klo mislkn halaman yang di cari tidak ada
app.use(function (req, res, next) {
    res.sendStatus(404);
    res.send("Error : Page Not Found");
});

// cara menjalankan portnya
app.listen(port, () => {
    console.log("Web Server is listening on port :" + port);
});