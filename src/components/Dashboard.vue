<template>
  <table class="sellers">
    <tr>
      <th>Vendedor</th>
      <th>Puntaje</th>
    </tr>
    <tr v-for="(seller, points, index) in sellers" :key="index">
      <td>{{ points }}</td>
      <td>{{ seller }}</td>
    </tr>
  </table>
</template>

<script>
import store from '../store';
import { checkSellers } from '../alegra';

export default {
  name: 'Dashboard',
  data() {
    return {
      sellersNames: [],
      sellersPoints: store.state.sellersPoints,
    };
  },
  methods: {
    async fetchSellers() {
      const response = await checkSellers();
      this.sellersNames = response.data;
    },
  },
  created() {
    this.fetchSellers();
  },
  computed: {
    sellers() {
      console.log(this.sellersNames);
      const sellers = {};
      this.sellersNames.forEach((key, index) => {
        sellers[key.name] = this.sellersPoints[index];
      });
      console.log(sellers);
      return sellers;
    },
  },
};
</script>

<style scoped>
.sellers {
  border-collapse: collapse;
  margin-left: 30px;
  margin-top: 30px;
  position: absolute;
}
.sellers td, .sellers th{
  border: 1px solid #ddd;
  padding: 15px;
}
.sellers tr:nth-child(even){
  background-color: #f2f2f2;
}
.sellers tr:hover{
  background-color: #ddd;
}
.sellers th{
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #00B19D;
  color: white;
}
</style>
