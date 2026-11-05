const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
    <meta charset="UTF-8">
    <title>brpanel</title>
    <style>
    body {
        background: #090014;
        color: white;
        font-family: Arial;
        text-align: center;
        padding: 70px 15px;
    }
    .panel {
        max-width: 500px;
        margin: auto;
        padding: 35px;
        background: #160027;
        border: 1px solid #a020f0;
        border-radius: 18px;
        box-shadow: 0 0 25px #8a2be2;
    }
    h1 { color: #d580ff; }
    input {
        padding: 14px;
        width: 80%;
        border-radius: 8px;
        border: 1px solid #a020f0;
        background: #090014;
        color: white;
        margin: 15px;
    }
    button {
        padding: 13px 30px;
        background: #a020f0;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    button:hover { background: #d580ff; }
    </style>
    </head>
    <body>
    <div class="panel">
        <h1>brpanel</h1>
        <p>Herkese açık profil analiz paneli</p>
        <form action="/analiz" method="POST">
            <input name="username"
            placeholder="TikTok kullanıcı adı" required>
            <br>
            <button type="submit">PROFİLİ ANALİZ ET</button>
        </form>
    </div>
    </body>
    </html>
    `);
});

app.post("/analiz", (req, res) => {
    const username = req.body.username.trim().replace(/^@/, "");

    if (!/^[a-zA-Z0-9._]{1,24}$/.test(username)) {
        return res.send("Geçersiz kullanıcı adı.");
    }

    res.send(`
        <body style="background:#090014;color:white;text-align:center;font-family:Arial;padding:60px">
        <h1 style="color:#d580ff">PROFİL ANALİZİ</h1>
        <h2>@${username}</h2>
        <p>Profil bağlantısı:</p>
        <a style="color:#d580ff" href="https://www.tiktok.com/@${encodeURIComponent(username)}">
        TikTok profilini aç
        </a>
        <p>Bu sürüm henüz profil verilerini otomatik çekmiyor.</p>
        <a href="/" style="color:white">Geri dön</a>
        </body>
    `);
});

app.listen(3000, () => {
    console.log("brpanel hazır!");
    console.log("http://localhost:3000");
});