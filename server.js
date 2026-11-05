
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

function sayfa(icerik) {
    return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>BRPANEL</title>
        <style>
            * { box-sizing: border-box; }
            body {
                background: #090014;
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 40px 15px;
            }
            .panel {
                max-width: 550px;
                margin: auto;
                padding: 30px;
                background: #160027;
                border: 1px solid #a020f0;
                border-radius: 18px;
                box-shadow: 0 0 25px #8a2be2;
            }
            h1 { color: #d580ff; }
            input {
                width: 90%;
                padding: 14px;
                margin: 15px 0;
                border-radius: 8px;
                border: 1px solid #a020f0;
                background: #090014;
                color: white;
            }
            button {
                padding: 13px 25px;
                background: #a020f0;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
            }
            button:hover { background: #d580ff; }
            .card {
                background: #230039;
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            a { color: #d580ff; }
            .muted { color: #bda9cc; font-size: 13px; }
            .history { text-align: left; margin-top: 25px; }
        </style>
    </head>
    <body>
        <div class="panel">
            <h1>BRPANEL</h1>
            <p>Herkese açık TikTok profil analiz paneli</p>

            ${icerik}

            <p class="muted">
                Yalnızca herkese açık profil bağlantıları kullanılır.
                Gizli kişisel bilgiler sorgulanmaz.
            </p>
        </div>
    </body>
    </html>`;
}

app.get("/", (req, res) => {
    res.send(sayfa(`
        <form action="/analiz" method="POST">
            <input
                name="username"
                placeholder="TikTok kullanıcı adı"
                maxlength="24"
                required
            >
            <br>
            <button type="submit">PROFİLİ ANALİZ ET</button>
        </form>

        <div class="history">
            <h3>Son analizlerin</h3>
            <ul id="history"></ul>
            <button type="button" onclick="localStorage.removeItem('brhistory');location.reload()">
                Geçmişi temizle
            </button>
        </div>

        <script>
            const history = JSON.parse(
                localStorage.getItem("brhistory") || "[]"
            );
            document.getElementById("history").innerHTML =
                history.map(x => "<li>" + x + "</li>").join("");
        </script>
    `));
});

app.post("/analiz", (req, res) => {
    const username = (req.body.username || "")
        .trim()
        .replace(/^@/, "");

    if (!/^[a-zA-Z0-9._]{1,24}$/.test(username)) {
        return res.send(sayfa(`
            <h2>Geçersiz kullanıcı adı!</h2>
            <a href="/">Geri dön</a>
        `));
    }

    const profil = "https://www.tiktok.com/@" +
        encodeURIComponent(username);

    res.send(sayfa(`
        <div class="card">
            <h2>PROFİL ANALİZİ</h2>
            <h3>@${username}</h3>
            <p>Profil durumu: Analiz isteği hazırlandı</p>
            <p>Profil bağlantısı:</p>
            <a href="${profil}" target="_blank" rel="noopener noreferrer">
                TikTok profilini aç
            </a>
            <p class="muted">
                Takipçi, biyografi ve fotoğraf gibi veriler
                bu sürümde otomatik olarak çekilmez.
            </p>
        </div>

        <br>
        <a href="/">Yeni analiz yap</a>

        <script>
            const key = "brhistory";
            const history = JSON.parse(localStorage.getItem(key) || "[]");
            history.unshift("@${username}");
            localStorage.setItem(key, JSON.stringify(history.slice(0, 10)));
        </script>
    `));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("BRPANEL hazır: " + PORT);
});
