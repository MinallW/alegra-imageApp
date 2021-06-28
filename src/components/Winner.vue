<template>
  <div class="winner">
    <h2>Y, el ganador es:</h2>
    <h2>{{ seller }} </h2>
    <h3 v-if="winner">Alguien gano!</h3>
    <p>¿Quieres hacer una factura?</p>
    <button type="submit" class="btn btn--green btn--go" @click="createBill">
      Hacer una factura
    </button>
  </div>
</template>

<script>
import createInvoice, { checkSellers } from '../alegra';

export default {
  name: 'winner',
  props: {
    nameIndex: Number,
  },
  data() {
    return {
      seller: '',
      sellerId: null,
    };
  },
  created() {
    this.fetchSellers();
  },
  methods: {
    async createBill() {
      const response = await createInvoice({
        date: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
        seller: this.sellerId,
        client: 1,
        items: [
          {
            id: 1,
            price: 12,
            quantity: 5,
          },
        ],
      });
      console.log(response);
    },
    async fetchSellers() {
      const response = await checkSellers();
      const sellersNames = response.data;
      this.seller = sellersNames[this.nameIndex].name;
      this.sellerId = sellersNames[this.nameIndex].id;
    },
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1300px) {
  .winner {
    position: absolute;
  }
}
.winner .btn {
  margin-left: 0px;
}
.winner {
  right: 30px;
}
</style>
