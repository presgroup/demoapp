import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: '',
    locationSearchString: ''
  },
  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
    },
    SET_SEARCHSTRING (state, locationSearchString) {
      state.locationSearchString = locationSearchString
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
    lookupLocationByZip ({ commit, dispatch }, zip) {
      const apiKey = 'bqfkH2mN49AwnuBkPBkaOMblKlGk7vFAnfdg2S1pk16ZzQuMTTEhQgdKZ1ye2uWj'
      const apiUrl = `http://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`
      axios.get(apiUrl)
      .then(response => {
        console.log(response.data)
        // if the response is successful, update the location

      })
    },
    getWeather ({ commit, state }) {
      console.log('getWeather')
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios.get(`${apiUrl}?q=${state.location}&appid=${appId}`)
      .then(response => {
        console.log(response.data)
        // if the response is successful, update the weather

        commit('SET_WEATHER', null)
      })
    }
  }
})

export default store
