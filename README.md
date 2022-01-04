# demoapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Instructions

### Ask for help if you need it. You can contact Jared at 620-340-5075.

### Fix the openweather API to allow searching by zip code

You will need a CORS plugin to disable security settings in Chrome. 
```
https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en
```

* There are two APIs used in this application. One uses a zipcode API to look up a city/state based on zipcode. The other looks up weather based on a location search string. Your goal is to implement code that changes the weather lookup to allow for zipCode based lookups.

* This application uses Vue and Vuex. Please keep all logic inside the vuex module using actions and mutations.

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).