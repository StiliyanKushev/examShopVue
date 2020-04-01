<template>
  <div id="root">
    <div class="App">
        <!-- <ToastContainer autoClose={2300} /> -->
        <AppHeader />
        <!-- <AppContent /> -->
        <AppFooter />
    </div>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
/* initial css */
html {
  height: 100%;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

body {
  margin: 0%;
  font-family: sans-serif;
}
</style>
