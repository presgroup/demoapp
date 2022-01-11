import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: [{}],
    locationSearchString: '',
    zipCode: '',
    locationInfo: '',
  },
  mutations: {
    SET_WEATHER(state, weather) {
      state.weather = weather
    },
    SET_SEARCHSTRING(state, locationSearchString) {
      state.locationSearchString = locationSearchString
      console.log('SET_SEARCHSTRING ran')
    },
    SET_LOCATIONINFO(state, locationInfo) {
      state.locationInfo = locationInfo
      console.log('SET_LOCATIONINFO ran')
      console.log(state.locationInfo)
      console.log(state.locationInfo.city)
      console.log(state.locationInfo.state)
    }
  },
  actions: {
    setWeather({ commit }, weather) {
      commit('SET_WEATHER', weather)
    },
    setLocation({ commit, dispatch }, locationSearchString) {
      commit('SET_SEARCHSTRING', locationSearchString)
      dispatch('getWeather')
    },
    lookupLocationByZip({ commit, dispatch }, zip) {
      const apiKey =
        'bqfkH2mN49AwnuBkPBkaOMblKlGk7vFAnfdg2S1pk16ZzQuMTTEhQgdKZ1ye2uWj'
      const apiUrl = `http://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`
      axios.get(apiUrl).then(response => {
        // if the response is successful, update the location search string
        // then trigger the getWeather action
        commit('SET_SEARCHSTRING', response.data.zip_code)
        console.log(response.data)
        console.log(response.data.city)
        console.log(response.data.state)
        commit('SET_LOCATIONINFO', response.data)
        dispatch('getWeather')
      })
    },
    getWeather({ commit, state }) {
      console.log('getWeather fired')
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios
        .get(`${apiUrl}?zip=${state.locationSearchString}&appid=${appId}`)
        .then(response => {
          // if the response is successful, update the weather

          commit('SET_WEATHER', response.data.weather)
          console.log(state.weather[0])
          console.log(state.weather[0].description)
          console.log(state.weather)
          console.log(typeof state.weather)
          console.log(response.data)
        });
    }
  },
});

export default store
