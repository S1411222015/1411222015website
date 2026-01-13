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
        // 抓取作品列表
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

        // 新增作品
        async addPortfolio() {
            try {
                const form = document.querySelector("#addWorkForm form");
                const formData = new FormData(form);

                const response = await fetch("/portfolio_add", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    alert("作品新增成功");

                    // 清空表單
                    this.newPortfolio.title = "";
                    this.newPortfolio.description = "";
                    

                    // 將新增作品加入 portfolio（後端已回傳完整資料）
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
        // 初始化抓作品
        this.fetchPortfolio();
    }
    
}).mount("#portfolio");