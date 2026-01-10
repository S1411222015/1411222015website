const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const path = require("path");
const DB = require("nedb-promises");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// 靜態檔案
server.use(express.static(path.join(__dirname, "public")));

const ServiceDB = DB.create(__dirname + "/Service.db");

// ===== 初始化 Portfolio 資料 =====
async function initPortfolio() {
  const exists = await ServiceDB.find({ type: "portfolio" });
  if (exists.length === 0) {
    await ServiceDB.insert([
      { type:"portfolio", title:"我推的孩子(同人)", description:"這是我創作的 2D 插畫作品【推しの子】自己閒餘時間所創作。", image:"img/Idol.jpg", href:"#portfolioModal1" },
      { type:"portfolio", title:"葬送的芙莉蓮(同人)", description:"葬送のフリーレン，同為自己興趣所畫。", image:"img/fu.jpg", href:"#portfolioModal2" },
      { type:"portfolio", title:"鏈鋸人.帕瓦(同人)", description:"チェンソーマン的角色血之惡魔，因自己興趣所畫。", image:"img/PAWA.jpg", href:"#portfolioModal3" },
      { type:"portfolio", title:"電馭叛客：邊緣行者", description:"サイバーパンク エッジランナーズ裡的角色露西，興趣所畫。", image:"img/lucy.jpg", href:"#portfolioModal4" },
      { type:"portfolio", title:"鏈鋸人", description:"鏈鋸人插畫是可以做成書籤的樣式，也是興趣圖。", image:"img/makima.jpg", href:"#portfolioModal5" },
      { type:"portfolio", title:"JETT婕提", description:"valorant裡的特務之一，也是因為很喜歡所以才畫，是採用厚塗手法創作。", image:"img/jett.jpg", href:"#portfolioModal6" },
      { type:"portfolio", title:"人物創圖(系列圖)", description:"自己所創作的角色，宣傳圖，他是一系列的不過其他的還沒完成", image:"img/see_that.jpg", href:"#portfolioModal7" },
      { type:"portfolio", title:"clove珂樂芙", description:"valorant裡的特務之一，採用厚塗手法創作，屬於比較前期的作品，當時厚塗手法不是很熟練", image:"img/clove_pant.jpg", href:"#portfolioModal8" },
      { type:"portfolio", title:"BOL繪畫小專題", description:"大一繪畫課和組員們一起創作的遊戲角色設計海報，我設計的角色是[極]", image:"img/BOL.png", href:"#portfolioModal9" }
    ]);
  }
}

initPortfolio();

// 根目錄
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// portfolio API
server.get("/portfolio", async (req, res) => {
  const Portfolio = await ServiceDB.find({ type: "portfolio" });
  res.json(Portfolio);
});

// 新增作品 API
server.post("/portfolio", async (req, res) => {
  const newPortfolio = { type: "portfolio", ...req.body };
  const inserted = await ServiceDB.insert(newPortfolio);
  res.json(inserted);
});

server.listen(8090, () => {
  console.log("Server running on http://localhost:8090");
});
