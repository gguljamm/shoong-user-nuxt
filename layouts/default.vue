<template>
  <div class="nuxtWrapper" :class="['chat-ios-roomId', 'chat-aos-roomId'].indexOf($route.name) >= 0 ? 'hideNavi' : ''">
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

<style lang="scss">
  html{
    &.fixed{
      overflow: hidden;
      height: 100%;
      width: 100%;
      position: fixed;
      body{
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
      }
    }
  }
  body{
    /*background-color: rgb(243, 243, 243);*/
    /*height: 100%;*/
    /*&.disable-scroll {*/
    /*  position: fixed;*/
    /*  bottom:0;*/
    /*  left:0;*/
    /*  right:0;*/
    /*  height: 100vh;*/
    /*  overflow: hidden;*/
    /*}*/
  }
  .nuxtWrapper{
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: 44px;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 44px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 44px);
    &.hideNavi{
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>

