<template>
  <div class="winner">
    <h2>Y, el ganador es:</h2>
    <h2>{{ seller }} </h2>
    <h3 v-if="winner">Alguien gano!</h3>
    <p v-if="!generated">¿Quieres hacer una factura?</p>
    <button type="submit" class="btn btn--green btn--go" @click="createBill" v-if="!generated">
      Hacer una factura
    </button>
    <p v-if="generated">¡Generado correctamente!</p>
    <button type="submit" class="btn btn--green btn--go" @click="goHome" v-if="generated">
      Volver
    </button>

  </div>
</template>

<script>
import createInvoice, { checkSellers } from '../alegra';
import store from '../store';

export default {
  name: 'winner',
  store,
  props: {
    nameIndex: Number,
  },
  data() {
    return {
      seller: '',
      sellerId: null,
      generated: false,
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
            quantity: this.addQuantity(),
          },
        ],
      });
      if (response) {
        this.generated = true;
        this.$router.push({ name: 'Invoice', params: { id: response.data.id } });
      }
    },
    addQuantity() {
      const result = store.state.sellersPoints.reduce((a, b) => a + b, 0);
      return result;
    },
    async fetchSellers() {
      const response = await checkSellers();
      const sellersNames = response.data;
      this.seller = sellersNames[this.nameIndex].name;
      this.sellerId = sellersNames[this.nameIndex].id;
    },
    goHome() {
      this.$router.push({ name: 'Home' });
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
