const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 8000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

// localhost:8000
app.get("/", (req, res, next) => {
  res.send("<p>Hallo FSW 1 TERCINTA</p>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    data: {
      customers: customers,
    },
  });
});

// Membuat data baru
app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);

  customers.push(req.body);
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Gagal menyimpan data.",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            customers: req.body, // Mengirim kembali data pelanggan yang baru saja ditambahkan
          },
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
