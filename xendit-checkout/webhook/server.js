import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/kusuma-order", async (req, res) => {
  const { body } = req;
  if (body.status === "PAID") {
    console.log(
      `Invoice telah berhasil dibayar dengan status ${body.status} dan id ${body.id}`
    );
    // Di sini Anda dapat melakukan pembaruan status pesanan atau tindakan lain yang sesuai
    res.status(200).json({ success: true, body });
  } else if (body.status === "EXPIRED") {
    console.log(`Invoice telah kedaluwarsa dengan id ${body.id}`);
    // Di sini Anda dapat menangani status expired, misalnya membatalkan pesanan atau memberikan notifikasi kepada pengguna
    res.status(200).send("Expired!");
  } else {
    console.log(`Invoice gagal dibayar dengan status ${body.status}`);
    // Di sini Anda dapat menangani kegagalan pembayaran atau tindakan lain yang sesuai
    res.status(200).send("Failed!");
  }
});

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
