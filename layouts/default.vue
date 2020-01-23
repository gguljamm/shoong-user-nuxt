<template>
  <div class="nuxtWrapper">
    <nuxt v-if="init"/>
    <Navigator></Navigator>
  </div>
</template>

<script>
import Firebase from 'firebase';
import Navigator from '~/components/navigator.vue';

export default {
  components: {
    Navigator,
  },
  data() {
    return {
      init: false,
    };
  },
  mounted() {
    this.init = true;
    Firebase.auth().signInAnonymously();
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.$store.commit('setUserId', user.uid);
      } else {
        this.userId = '';
      }
    });
  },
};
</script>

<style>
  body{
    /*background-color: rgb(243, 243, 243);*/
  }
  .nuxtWrapper{
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: 44px;
  }
</style>

