<template>
  <div class="wrapper">
    <h1>The winner is:</h1>
    <ul>
      <li
        v-for="(name, index) in sellersNames"
        :key="index"
      >{{name}}</li>
      <li
        v-for="(points, index) in sellersPoints"
        :key="index"
      >{{points}}</li>

    </ul>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'dashboard',
  store,
  data() {
    return {
      sellersNames: store.state.sellers,
      sellersPoints: store.state.sellersPoints,
    };
  },
};
</script>
