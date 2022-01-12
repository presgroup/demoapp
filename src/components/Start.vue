<template>
  <div class="weather">

    <input 
      v-model="zipCode" 
      type="text" 
      label="Location" 
      placeholder="Location Search"
      @input="updateZipCode">
    <!-- buttons can be useful for testing / debugging -->
    <button @click="getWeather">Refresh Weather</button>
    <button @click="updateZipCode">Lookup ZipCode</button>

    <!-- display weather here -->

    <h1 v-if="weather">
      The temperature is currently: {{ weather[0] }}&#8457; in  {{ location }} 
    </h1>
    <ul v-if="weather">
      <li>The real feel today is: <b>{{ weather[1] }}&#8457;</b></li>
      <li>The high today in {{ location }} will be: <b> {{ weather[2] }}&#8457;</b> </li>
      <li>The low today in {{ location }} will be: <b>{{ weather[3] }}&#8457;</b></li>
    </ul>
   
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Start',
  data () {
    return {
      zipCode: '',
    }
  },
  computed: mapState ({
    // map state from vuex here using mapState
    weather: state => state.weather,
    location: state => state.locationSearchString

  }),
  methods: {
    updateZipCode () {
      console.log('updateZipCode', this.zipCode)
      if (this.zipCode && this.zipCode.length === 5) {
        this.lookupLocationByZip(this.zipCode)
      }
    },
    

    ...mapActions(['getWeather', 'setLocation', 'lookupLocationByZip'])
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
button {
    display: inline-block;
    background: #333;
    color: white;
    font-size: 14px;
    border: 0;
    padding: 1rem 1.5rem;
    margin-top: 20px;
    margin-left: 15px;
    
   
  }
  input {
    padding-left: 1rem;
    font-size: 29px;
    text-align: center;
    
  }

  div {
    padding-top: 80px;
  }
</style>
