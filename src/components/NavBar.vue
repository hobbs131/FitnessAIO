<template>
  <div id="nav">
    <Auth></Auth>
  </div>
</template>

<script>
import Auth from '../views/Auth.vue'
export default {
  name: 'NavBar',
  components: { Auth },
  props: ["user"]
}
</script>

<style>
#nav {
  padding-top: 10px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0px 10px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>