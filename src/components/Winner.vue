<template>
  <div class="winner">
    <h2>Y, el ganador es:</h2>
    <h3 v-if="winner">Alguien gano!</h3>
    <p>¿Quieres hacer una factura?</p>
    <button type="submit" class="btn btn--green btn--go" @click="createBill">
      Hacer una factura
    </button>
  </div>
</template>

<script>
import createInvoice from '../alegra';

export default {
  name: 'winner',
  methods: {
    async createBill() {
      const response = await createInvoice({
        date: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
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
  },
};
</script>

<style scoped>
.winner .btn {
  margin-left: 0px;
}
.winner {
  position: absolute;
  right: 30px;
}
</style>
