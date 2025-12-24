const { createApp, ref } = Vue;

const portfolioApp = createApp({
  setup() {
    const Portfolio = ref([]); // 一開始空陣列

    // 模擬從伺服器抓資料
    setTimeout(() => {
      const result = [
        {
          id: 1,
          title: "我推的孩子(同人)",
          description: "這是我創作的 2D 插畫作品【推しの子】自己閒餘時間所創作。",
          image: "img/Idol.jpg"
        },
        {
          id: 2,
          title: "葬送的芙莉蓮(同人)",
          description: "葬送のフリーレン，同為自己興趣所畫。",
          image: "img/fu.jpg"
        },
        {
          id: 3,
          title: "鏈鋸人.帕瓦(同人)",
          description: "チェンソーマン的角色血之惡魔，因自己興趣所畫。",
          image: "img/PAWA.jpg"
        },
        {
          id: 4,
          title: "電馭叛客：邊緣行者",
          description: "サイバーパンク エッジランナーズ裡的角色露西，興趣所畫。",
          image: "img/lucy.jpg"
        },
        {
          id: 5,
          title: "鏈鋸人",
          description: "鏈鋸人插畫是可以做成書籤的樣式，也是興趣圖。",
          image: "img/makima.jpg"
        },
        {
          id: 6,
          title: "JETT婕提",
          description: "valorant裡的特務之一，也是因為很喜歡所以才畫，是採用厚塗手法創作。",
          image: "img/jett.jpg"
        },
        {
          id: 7,
          title: "人物創圖(系列圖)",
          description: "自己所創作的角色，宣傳圖，他是一系列的不過其他的還沒完成",
          image: "img/see_that.jpg"
        },
        {
          id: 8,
          title: "clove珂樂芙",
          description: "valorant裡的特務之一，採用厚塗手法創作，屬於比較前期的作品，當時厚塗手法不是很熟練",
          image: "img/clove_pant.jpg"
        },
        {
          id: 9,
          title: "BOL繪畫小專題",
          description: "大一繪畫課和組員們一起創作的遊戲角色設計海報，我設計的角色是[極]",
          image: "img/BOL.png"
        }
      ];
      Portfolio.value = result; // 成功後動態渲染
    }, 500); // 模擬延遲

    // 如果真有後端 API，可用 AJAX 替換 setTimeout
    /*
    $.ajax({
      url: "/portfolio",
      method: "GET",
      dataType: "json",
      success: (result) => {
        Portfolio.value = result;
      },
      error: (err) => {
        console.error("抓取作品資料失敗:", err);
      }
    });
    */

    return { Portfolio };
  }
}).mount("#portfolio");

