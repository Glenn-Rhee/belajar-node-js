// rquire mongodb 
const { MongoClient } = require("mongodb");

// Connection URL 
const url = "mongodb://127.0.0.1:27017";
const dbname = "glenn";

// Konfigurasi ke database
(async () => {
    const client = new MongoClient(url);
    await client.connect();

    // Cara menampilkan data yang ada di client
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").find().toArray();


    // Cara menampilkan data berdasarkan kriteria tertentu 
    // ini harus sama persis kriterianya
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").findOne({nama: "Maggie Rhee"});


    // Cara menambahkan 1 data 
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").insertOne({nama: "Maggie Rhee", email: "maggie@gmail.com"});


    // Cara menambahkan lebih dari satu data 
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").insertMany([
    //     {
    //         nama: "Najwah Khairyah Syabani",
    //         email: "najwaks1909@gmail.com"
    //     }, 
    //     {
    //         nama: "Yusuf Habibie Setyo Nugroho",
    //         email: "yusufhabibi@gmail.com"
    //     }
    // ])


    // Cara mengupdate 1 data 
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").updateOne({ nama: "Glenn Viktor" }, {
    //     $set: {
    //         nama: "Glenn Rhee"
    //     }
    // });


    // cara mengupdate lebih dari satu data 
    // const db = client.db(dbname);
    // const collections = await db.collection("mahasiswa").updateMany({nama: "Glenn Rhee"}, {
    //     $set: {
    //         email: "glennviktor@ac.id"
    //     }
    // })


    // Cara delete satu data 
    const db = client.db(dbname);
    const collections = await db.collection("mahasiswa").deleteOne({ nama: "Maggie Rhee" })
    console.log(collections);



    client.close();
})().catch((err) => console.log(err));