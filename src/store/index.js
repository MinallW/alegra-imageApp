import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      sellersPoints: [],
    };
  },
  mutations: {
    addPoints(state, sellerIndex) {
      state.sellersPoints[sellerIndex] += 3;
    },
    addseller(state) {
      state.sellersPoints.push(0);
    },
  },
});
