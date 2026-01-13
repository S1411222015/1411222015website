const { createApp, ref } = Vue;

var portfolioApp = Vue.createApp({
    data() {
        return {
            portfolio: [],

            // 對應表單 v-model
            newPortfolio: {
                title: "",
                description: ""
            }
        }
    },

    methods: {
        // 抓作品
        fetchPortfolio() {
            $.ajax({
                url: "/portfolio",
                method: "get",
                dataType: "json",
                success: (result) => {
                    this.portfolio = result; // 直接使用後端資料
                },
                error: (err) => console.error("抓作品列表失敗", err)
            });
        },

        // 新增
        async addPortfolio() {
            try {
                const form = document.querySelector("#addWorkForm form");
                const formData = new FormData(form);  //轉成post可傳的格式

                const response = await fetch("/portfolio_add", {
                    method: "POST",
                    body: formData  //送
                });

                const result = await response.json();  //等.解json

                if (result.success) {
                    alert("作品新增成功");

                    // 清
                    this.newPortfolio.title = "";
                    this.newPortfolio.description = "";
                    

                    // 將新作品加入portfolio
                    const newItem = result.newItem;
                    if (newItem) {
                        this.portfolio.push({
                            _id: newItem._id,
                            title: newItem.title,
                            text: newItem.text,
                            imgSrc: newItem.imgSrc
                        });
                    }

                } else {
                    alert("新增失敗");
                }

            } catch (err) {
                console.error(err);
                alert("伺服器錯誤");
            }
        }
    },

    mounted() {
       
        this.fetchPortfolio();
    }
    
}).mount("#portfolio");