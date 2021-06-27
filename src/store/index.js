import { createStore } from 'vuex';

// Create a new store instance.
export default createStore({
  state() {
    return {
      sellers: [
        'Mike Tyson',
        'Michael Jackson',
        'Will Smith',
        'John Connor',
        'Donald Trump',
        'Cristiano Ronaldo',
      ],
      sellerPoints: [0, 0, 0, 0, 0, 0],
    };
  },
  mutations: {
    addPoints(state, sellerIndex) {
      state.sellerPoints[sellerIndex] += 3;
    },
  },
});
