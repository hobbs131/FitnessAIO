<template>
  <div class="home">
	<div>
    <h1 style="display:inline-block;font-size:50px;margin-bottom:0px"> Welcome to </h1> <p style = " display:inline-block"></p> <h1 style = "display:inline-block;font-family:Abel;font-size:50px;margin-bottom:0px">Fitness AIO</h1>
	</div>
	<p style = "margin-bottom:50px">Please Sign in to continue</p>
    <Auth></Auth>
  </div>
</template>

<script>
import Auth from './Auth.vue'

import { auth } from "@/firebaseConfig";

export default {
  name: 'Home',
  components: {
    Auth
  },

  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/tables');
      }
    });
  }
}


</script>

<style scoped>
</style>
