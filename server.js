const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const path = require("path");

// 解析 POST 請求資料
server.use(bodyParser.urlencoded({ extended: true }));

var DB=require("nedb-promises");
var ServiceDB = DB.create(__dirname+"/Service.db")

// 靜態檔案設定 (HTML, CSS, JS, 圖片)
server.use(express.static(path.join(__dirname, "public")));
server.use(bodyParser.urlencoded());

// 根目錄送出 index1.html
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index1.html"));
});

// services 路由範例
server.get("/services", (req, res) => {
    const Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", text: "Lorem ipsum..." },
        { icon: "fa-laptop", title: "Responsive Design", text: "Lorem ipsum..." },
        { icon: "fa-lock", title: "Web Security", text: "Lorem ipsum..." }
    ];
    res.json(Services);
});

// portfolio 路由範例
server.get("/portfolio", (req, res) => {
    const Portfolio = [
        { href: "#portfolioModal1", imgSrc: "img/project1.jpg", title: "作品 1", text: "Graphic Design" },
        { href: "#portfolioModal2", imgSrc: "img/project2.jpg", title: "作品 2", text: "Website Design" },
        { href: "#portfolioModal3", imgSrc: "img/project3.jpg", title: "作品 3", text: "Website Design" }
    ];
    res.json(Portfolio);
});

// about 範例
server.get("/about", (req, res) => {
    res.send("Welcome " + req.query.user + " to My first NodeJS server!");
})

server.listen(8090)