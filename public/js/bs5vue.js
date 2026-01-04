const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const Portfolio = ref([]);
    const newPortfolio = ref({ title:'', description:'', image:'', href:'#' });

    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("/portfolio"); // 相對路徑
        Portfolio.value = res.data;
      } catch(err) { console.error(err); }
    };

    const addPortfolio = async () => {
      try {
        const res = await axios.post("/portfolio", newPortfolio.value);
        Portfolio.value.push(res.data);
        newPortfolio.value = { title:'', description:'', image:'', href:'#' };
      } catch(err) { console.error(err); }
    };

    onMounted(fetchPortfolio);

    return { Portfolio, newPortfolio, addPortfolio };
  }
}).mount("#app");