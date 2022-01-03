<template>
  <div class="weather">
    <!-- display weather here -->
    
    <input 
      v-model="location" 
      type="text" 
      label="Location" 
      placeholder="Location Search"
      @input="updateZipCode">
    <button @click="getWeather">Refresh Weather</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Start',
  data () {
    return {
      location: ''
    }
  },
  computed: {
    // map state from vuex here
  },
  methods: {
    updateZipCode () {
      console.log('updateZipCode', this.zipCode)
      if (this.zipCode && this.zipCode.length === 5) {
        this.setZipCode(this.zipCode)
      }
    },
    ...mapActions(['getWeather', 'setZipCode'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
