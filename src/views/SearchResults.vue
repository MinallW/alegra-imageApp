<template>
  <div class='flex'>
    <dashboard/>
    <winner v-if="winner" v-bind:name-index="this.nameIndex"/>
  </div>
  <div class="wrapper">
    <h1 v-if="alreadyClicked">Busca otra imagen en nuestra tienda...</h1>
    <h1 v-else>Resultados de: "{{tag}}", ¿Qué imagen destaca?</h1>

    <ul v-if="!loading" class="image-card-grid">
      <image-card v-for="(image, index) in cleanImages" :key="image.id" :image="image"
      @click="onClick(index)"/>
    </ul>

    <ul v-else class="image-card-grid">
      <image-card v-for="n in 6" :key="n" :loading="true"/>
    </ul>
  </div>
</template>

<script>
import ImageCard from '../components/ImageCard.vue';
import flickr from '../flickr';
import store from '../store';
import Dashboard from '../components/Dashboard.vue';
import Winner from '../components/Winner.vue';

export default {
  name: 'searchResults',
  store,
  components: {
    ImageCard,
    Dashboard,
    Winner,
  },
  props: {
    tag: String,
  },
  created() {
    this.search();
  },
  watch: {
    tag() {
      this.search();
    },
  },
  data() {
    return {
      loading: false,
      sellersPoints: store.state.sellersPoints,
      winner: false,
      nameIndex: null,
      alreadyClicked: false,
      images: [],
    };
  },
  computed: {
    isTagEmpty() {
      return !this.tag || this.tag.length === 0;
    },
    cleanImages() {
      return this.images.filter((image) => image.url_n);
    },
  },
  methods: {
    search() {
      if (!this.isTagEmpty) {
        this.loading = true;
        this.fetchImages();
      }
    },
    checkPoints() {
      const result = this.sellersPoints.filter((number) => number >= 20);
      return result;
    },
    async fetchImages() {
      const response = await flickr('photos.search', {
        tags: this.tag.trim(),
        extras: 'url_n, owner_name, description, date_taken, views',
        page: 1,
        per_page: 6,
      });
      this.images = response.data.photos.photo;
      this.loading = false;
      this.alreadyClicked = false;
    },
    onClick(index) {
      const result = this.checkPoints();
      if (result.length === 0 && this.alreadyClicked === false) {
        store.commit('addPoints', index);
        this.alreadyClicked = true;
        const reCheck = this.checkPoints();
        if (reCheck.length === 1) {
          this.winner = true;
          this.nameIndex = index;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@media only screen and (max-width: 1300px) {
  .flex {
  display: flex;
  justify-content: space-around;
  }
}

.screen-reader-only {
  height: 1px;
  width: 1px;
  position: absolute;
  left: -100000px;
}
.text-centered {
  text-align: center;
}
.wrapper {
  margin: 0 auto;
  max-width: 800px;
  @media only screen and (max-width: 799px) {
    max-width: 100%;
    margin: 0 1.5rem;
  }
}
.image-card-grid {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f0f0f0;
}
.searchbar {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 549px) {
    width: 100%;
    label {
      width: 80%;
    }
  }
}
.searchbar-input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  border: 1px solid gray;
  min-width: 300px;
  @media only screen and (max-width: 549px) {
    min-width: 0;
    width: 100%;
  }
}
.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  background: transparent;
  border: none;
}
.btn--green {
  background: #00B19D;
  color: white;
  font-weight: bold;
}
.btn--go {
  padding: 0.5rem 2rem;
  margin-left: 1rem;
}
</style>
