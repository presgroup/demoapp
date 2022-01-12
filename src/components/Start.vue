<template>
  <div class="weather">
    <!-- display weather here -->
    <div>Weather for: {{ city }} {{ state }} {{ zip }}</div>
    <div>Description: {{ weatherDescription }}</div>
    <div>
      <img :src="weatherIcon" alt="WeatherIconPic" />
    </div>
    <div>Weather Id: {{ weatherId }}</div>
    <div>Weather Main: {{ weatherMain }}</div>

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
import { mapState } from 'vuex';

export default {
  name: 'Start',
  data() {
    return {
      zipCode: '',
    };
  },
  computed: mapState({
    // map state from vuex here using mapState
    weatherDescription: (state) => state.weather[0].description,
    weatherId: (state) => state.weather[0].id,
    weatherMain: (state) => state.weather[0].main,
    weatherIcon: 'weatherIcon',
    zip: 'locationSearchString',
    city: (state) => state.locationInfo.city,
    state: (state) => state.locationInfo.state,
  }),

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
