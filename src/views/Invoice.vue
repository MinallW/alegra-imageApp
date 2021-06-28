<template>
  <div class="wrapper">
    <h1>¡Factura creada correctamente!</h1> <br/>
    <table class="invoice">
      <tr>
        <th>Cliente</th>
        <th>Documento</th>
        <th>Creaci&oacute;n</th>
        <th>Vencimiento</th>
        <th>Vendedor</th>
      </tr>
      <tr>
        <td>{{ invoice.client.name }}</td>
        <td>{{ invoice.client.identification }}</td>
        <td>{{ invoice.date }}</td>
        <td>{{ invoice.dueDate }}</td>
        <td>{{ invoice.seller.name }}</td>
      </tr>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Total</th>
      </tr>
      <tr>
        <td>{{ invoice.items[0].name }}</td>
        <td>{{ invoice.items[0].price }}</td>
        <td>{{ invoice.items[0].quantity }}</td>
        <td>{{ invoice.items[0].total }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchInvoice } from '../alegra';

export default {
  name: 'Invoice',
  props: {
    id: Number,
  },
  data() {
    return {
      invoice: {},
    };
  },
  created() {
    this.fetchData(this.id);
  },
  methods: {
    async fetchData(id) {
      const results = await fetchInvoice(id);
      this.invoice = results.data;
      console.log(this.invoice);
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
  display: flex;
}
.invoice {
  border-collapse: collapse;
  margin-left: 30px;
  margin-top: 30px;
}
.invoice td, .invoice th{
  border: 1px solid #ddd;
  padding: 15px;
}
.invoice tr:nth-child(even){
  background-color: #f2f2f2;
}
.invoice tr:hover{
  background-color: #ddd;
}
.invoice th{
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #00B19D;
  color: white;
}
</style>
