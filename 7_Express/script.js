
// versi express
const express = require("express");
const path = require("path");
const { send } = require("process");
const app = express();
const port = 3000;

// cara menjalankan express
app.get("/", (req, res) => {
    console.log(req.params.id);
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
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