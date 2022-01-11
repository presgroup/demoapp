<template>
  <div class="weather">
    <!-- display weather here -->
    <!-- This worked the before I added Getters:
  <div>{{ $store.state.weather }}</div> -->
    <!-- Now I'm trying my displayWeatherDiv with Getters: -->
    <div>{{ userName }}</div>
    <div>Description: {{ weatherDescription }}</div>

    <input
      v-model="zipCode"
      type="text"
      label="Location"
      placeholder="Location Search"
      @input="updateZipCode"
    />
    <!-- buttons can be useful for testing / debugging -->
    <button @click="getWeather">Refresh Weather</button>
    <button @click="updateZipCode">Lookup ZipCode</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'Start',
  data() {
    return {
      zipCode: '',
    };
  },
  computed: mapState({
    userName: (state) => state.name,
    weatherDescription: (state) => state.weather[0].description,
    weatherIcon: (state) => state.weather[0].icon,
    weatherId: (state) => state.weather[0].id,
    weatherMain: (state) => state.weather[0].main,
  }),
  // computed: {
  //   // map state from vuex here using mapState

  //   // 1st Attempt to copy video for mapState
  // },
  methods: {
    updateZipCode() {
      console.log('updateZipCode', this.zipCode);
      if (this.zipCode && this.zipCode.length === 5) {
        this.lookupLocationByZip(this.zipCode);
      }
    },
    ...mapActions(['getWeather', 'setZipCode', 'lookupLocationByZip']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
