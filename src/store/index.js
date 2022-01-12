import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: '',
    locationSearchString: '',
    zipCode: ''
  },
  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
    },
    SET_SEARCHSTRING (state, locationSearchString) {
      state.locationSearchString = locationSearchString
    },
    SET_ZIPCODE (state, userZipCode) {
      state.zipCode = userZipCode
    }

    
  },
  actions: {
    setWeather ({ commit }, weather) {
      commit('SET_WEATHER', weather)
    },
    setLocation ({ commit, dispatch }, locationSearchString) {
      commit('SET_SEARCHSTRING', locationSearchString)
      dispatch('getWeather')
    },
    lookupLocationByZip ({ commit }, zip) {
      const apiKey = 'bqfkH2mN49AwnuBkPBkaOMblKlGk7vFAnfdg2S1pk16ZzQuMTTEhQgdKZ1ye2uWj'
      const apiUrl = `http://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`
      axios.get(apiUrl)
      .then(response => {
        const zipData = response.data
        console.log(zipData)
        // if the response is successful, update the location search string
        // then trigger the getWeather action
        commit('SET_ZIPCODE', zipData.zip_code)
      })
    },
    getWeather ({ commit, state }) {
      console.log('getWeather')
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios.get(`${apiUrl}?q=${state.zipCode}&appid=${appId}`)
      .then(response => {
        const userWeather = response.data
        console.log(userWeather)
        const { main: {temp} } = userWeather
        
        // if the response is successful, update the weather

        commit('SET_WEATHER', temp)
        
      })
    }
  }
})

export default store
