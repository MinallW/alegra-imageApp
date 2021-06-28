<template>
  <h1>For invoice</h1>
</template>

<script>
// import fetchInvoice from '../store';

export default {
  name: 'Invoice',
  props: {
    id: Number,
  },
  created() {
    this.fetchData($route.params.id);
  },
  methods: {
    async fetchData(id) {
      console.log(id);
      // const result = await fetchInvoice(id);
    },
  },
};
</script>

<style scoped>
</style>
