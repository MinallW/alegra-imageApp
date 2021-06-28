<template>
  <table class="sellers">
    <tr>
      <th>Vendedor</th>
      <th>Puntaje</th>
    </tr>
    <tr v-for="(seller, points, index) in sellersObject" :key="index">
      <td>{{points}}</td>
      <td>{{seller}}</td>
    </tr>
  </table>
  <h1 class="winner">Y, el ganador es:</h1>
  <div class="sellerNames">
    <ul class="noList">
      <li v-for="(seller, index) in sellerNames" :key="index">{{seller}}</li>
    </ul>
  </div>
  <div class="sellerScores">
    <ul class="noList">
      <li v-for="(points, index) in sellerPoints" :key="index">{{points}}</li>
    </ul>
  </div>
  <div class="wrapper">
    <h1>Resultados de: "{{tag}}"</h1>

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

export default {
  name: 'searchResults',
  store,
  components: {
    ImageCard,
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
      winner: false,
      sellers: store.state.sellers,
      sellersPoints: store.state.sellersPoints,
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
    sellersObject() {
      const [fP, sP, tP, fourthP, fifthP, sixthP] = this.sellersPoints;
      return {
        'Mike Tyson': fP,
        'Michael J.': sP,
        'Will Smith': tP,
        'John connor': fourthP,
        'Donald Tr.': fifthP,
        'Cristiano R.': sixthP,
      };
    },
  },
  methods: {
    search() {
      if (!this.isTagEmpty) {
        this.loading = true;
        this.fetchImages();
      }
    },
    async fetchImages() {
      const response = await flickr('photos.search', {
        tags: this.tag.trim(),
        extras: 'url_n, owner_name, description, date_taken, views',
        page: 1,
        per_page: 30,
      });
      this.images = response.data.photos.photo;
      this.loading = false;
    },
    onClick(index) {
      store.commit('addPoints', index);
    },
  },
};
</script>

<style lang="scss">
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
  background: #42b983;
  color: white;
  font-weight: bold;
}
.btn--go {
  padding: 0.5rem 2rem;
  margin-left: 1rem;
}
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
  background-color: #04AA6D;
  color: white;
}
.winner {
  text-align: right;
}
</style>
