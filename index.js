const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());

app.use("/icons", express.static(path.join(__dirname, "icons")))

app.get("/icons", cors(), (req, res) => {
    const num = parseInt(req.query.num)
    const dirPath = path.join(__dirname, 'icons');

    fs.readdir(dirPath, (err, icons) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        if (num) {
            let randomIcons = new Set();
            while (randomIcons.size < num) {
                const idx = Math.floor(Math.random() * icons.length)
                randomIcons.add(icons[idx])
            }
            res.json({ icons : Array.from(randomIcons)})
        } else {
            res.json({ icons })
        }
    })
})

app.listen(process.env.URL || 3000)