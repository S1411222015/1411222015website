var express = require("express");
var server = express();
var bodyParser = require("body-parser");


server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")

var fileUpload = require("express-fileupload");

server.use(express.static(__dirname + "/Public"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:2*1024*1024}}))

var DB=require("nedb-promises");
var ServiceDB = DB.create(__dirname+"/Service.db");
var PortfolioDB = DB.create(__dirname+"/Portfolio.db");

/*PortfolioDB.insert([
    {
        href: "#portfolio",
        imgSrc: "/img/fu.jpg",
        title: "葬送的芙莉蓮 (同人)",
        text: "以《葬送のフリーレン》為題材的同人作品，同樣是因興趣所畫。",
        order: 1
      },
      {
        href: "#portfolio",
        imgSrc: "/img/lucy.jpg",
        title: "電馭叛客：邊緣行者",
        text: "描繪《サイバーパンク エッジランナーズ》中的角色露西，作品出於個人興趣。",
        order: 2
      },
      {
        href: "#portfolio",
        imgSrc: "/img/Idol.jpg",
        title: "我推的孩子 (同人)",
        text: "這是我創作的 2D 插畫作品《推しの子》，在自己的閒暇時間完成。",
        order: 3
      },
      {
        href: "#portfolio",
        imgSrc: "/img/PAWA.jpg",
        title: "鏈鋸人.帕瓦 (同人)",
        text: "《チェンソーマン》的角色血之惡魔帕瓦，創作源於個人興趣。",
        order: 4
      },
      {
        href: "#portfolio",
        imgSrc: "/img/BOL.png",
        title: "BOL繪畫小專題",
        text: "大一繪畫課和組員們一起創作的遊戲角色設計海報，我設計的角色是[極]",
        order: 5
      },
      {
        href: "#portfolio",
        imgSrc: "/img/makima.jpg",
        title: "鏈鋸人",
        text: "鏈鋸人插畫，可作為書籤樣式，也屬於興趣創作。",
        order: 6
      },
      {
        href: "#portfolio",
        imgSrc: "/img/clove_pant.jpg",
        title: "clove珂樂芙",
        text: "以《Valorant》特務clove為題，採用厚塗手法，屬較早期作品，當時厚塗技巧尚在磨練中。",
        order: 7
      },
      {
        href: "#portfolio",
        imgSrc: "/img/see_that.jpg",
        title: "人物創圖 (系列圖)",
        text: "自己創作的角色宣傳圖，是一系列作品的一部分，其餘部分尚未完成。",
        order: 8
      },
      {
        href: "#portfolio",
        imgSrc: "/img/jett.jpg",
        title: "JETT婕提",
        text: "以《Valorant》特務JETT為題，使用厚塗手法創作，源自對角色的喜愛。",
        order: 9
      }

    
]);
*/

server.get("/services", (req, res) => {
    
    ServiceDB.find({},{_id:0}).then(results=>{
       
        res.send(results);
    })
    
})

server.get("/portfolio", (req, res) => {
    PortfolioDB.find({}).then(results => {
        res.send(results);
    });
});

server.get("/showServices",(req,res)=>{
    ServiceDB.find({},{_id:0}).then(results=>{
       
        res.render("service",{Services:results});
    }).catch(error=>{

    })

})




server.post("/portfolio_add", async (req, res) => {
    try {
        let imgSrc = "";

        if (req.files && req.files.imageFile) {
            const file = req.files.imageFile;
            await file.mv(__dirname + "/Public/upload/" + file.name);
            imgSrc = "/upload/" + file.name;
        }

        // 非同步等待 DB 插入完成，並取得 _id
        const newItem = await PortfolioDB.insert({
            title: req.body.title,
            text: req.body.description,
            imgSrc: imgSrc
        });

        // 回傳完整資料給前端
        res.send({ success: true, newItem });

    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "伺服器錯誤" });
    }
});



server.listen(8090, () => {
  console.log("Server running on http://localhost:8090");
});
