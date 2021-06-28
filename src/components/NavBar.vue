<template>
  <nav class="navbar">
    <form class="searchbar">
      <label>
        <span class='screen-reader-only'>Buscar:</span>
        <input
          v-model="tag"
          placeholder="Buscar Im&aacute;genes"
          type="text"
          class="searchbar-input">
      </label>
      <button
        type="submit"
        class="btn btn--green btn--go"
        @click.prevent="search">
          Ir
      </button>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      tag: '',
    };
  },
  methods: {
    search() {
      this.$router.push({ name: 'searchResults', params: { tag: this.tag.trim() } });
      this.tag = '';
    },
  },
};
</script>
