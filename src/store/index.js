import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: [{}],
    locationSearchString: '',
    // Garrett - Removing the state zipCode did nothing to the app. If I don't end up needing it, remove it before turning in.
    zipCode: '',
    locationInfo: '',
    weatherIcon: '',
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
    },
    SET_WEATHER_ICON(state, weatherIcon) {
      state.weatherIcon = weatherIcon
      console.log('SET_WEATHER_ICON mutation fired')
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
      console.log('getWeather fired')
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios
        .get(`${apiUrl}?zip=${state.locationSearchString}&appid=${appId}`)
        .then(response => {
          // if the response is successful, update the weather
          if(response.status === 200) {
            commit('SET_WEATHER', response.data.weather)
            console.log(state.weather[0].icon)
            this.dispatch('getWeatherIcon')
            console.log(response.data)
          }
        });
    },
    getWeatherIcon({commit, state}) {
      const weatherIcon = fetch(`https://openweathermap.org/img/wn/${state.weather[0].icon}@2x.png`)
      fetch(`https://openweathermap.org/img/wn/${state.weather[0].icon}@2x.png`)
        // console.log(response)
      // commit('SET_WEATHER_ICON', weatherIcon)
      console.log('getWeatherIcon fired')
      this.dispatch('getText')
    },
    async getText({commit, state}) {
      console.log('getText fired.')
      console.log(state.weatherIcon)
      const myObject = await fetch(`https://openweathermap.org/img/wn/${state.weather[0].icon}@2x.png`);
      // let myText = await myObject.text();
      console.log(myObject)
      commit('SET_WEATHER_ICON', myObject.url)
      console.log(state.weatherIcon)
    }
  },
});

export default store
