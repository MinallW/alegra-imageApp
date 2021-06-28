import { createStore } from 'vuex';

// Create a new store instance.
export default createStore({
  state() {
    return {
      sellersPoints: [0, 0, 0, 0, 0, 0],
    };
  },
  mutations: {
    addPoints(state, sellerIndex) {
      state.sellersPoints[sellerIndex] += 3;
    },
  },
});
