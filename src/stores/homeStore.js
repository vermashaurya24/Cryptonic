import axios from "axios";
import create from "zustand";
import debounce from "../helper/debounce";

const homeStore = create((set) => ({
  coins: [],
  trendingCoins: [],
  query: "",
  searching: false,
  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    set({ searching: true });
    const { query, trendingCoins } = homeStore.getState();
    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });

      set({ coins, searching: false });
    } else {
      set({ coins: trendingCoins, searching: false });
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      ),
    ]);
    const btcPrice = btcRes.data.bitcoin.usd;
    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        id: coin.item.id,
        image: coin.item.large,
        priceBtc: coin.item.price_btc.toFixed(10),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
      };
    });
    set({ coins, trendingCoins: coins });
  },
}));

export default homeStore;
