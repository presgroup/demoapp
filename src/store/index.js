import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: [{}],
    locationSearchString: '',
    locationInfo: '',
    weatherIcon: 'https://openweathermap.org/img/wn/02d@2x.png',
  },
  mutations: {
    SET_WEATHER(state, weather) {
      state.weather = weather
    },
    SET_SEARCHSTRING(state, locationSearchString) {
      state.locationSearchString = locationSearchString
    },
    SET_LOCATIONINFO(state, locationInfo) {
      state.locationInfo = locationInfo
    },
    SET_WEATHER_ICON(state, weatherIcon) {
      state.weatherIcon = weatherIcon
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
        if(response.status === 200) {
          commit('SET_SEARCHSTRING', response.data.zip_code)
          commit('SET_LOCATIONINFO', response.data)
        }
        // then trigger the getWeather action
        dispatch('getWeather')
      })
    },
    getWeather({ commit, state }) {
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios
        .get(`${apiUrl}?zip=${state.locationSearchString}&appid=${appId}`)
        .then(response => {
          // if the response is successful, update the weather
          if(response.status === 200) {
            commit('SET_WEATHER', response.data.weather)
            this.dispatch('getWeatherIcon')
          }
        });
    },
    async getWeatherIcon({commit, state}) {
      const myObject = await fetch(`https://openweathermap.org/img/wn/${state.weather[0].icon}@2x.png`);
      commit('SET_WEATHER_ICON', myObject.url)
    },
  },
});

export default store
