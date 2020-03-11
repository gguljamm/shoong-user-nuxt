<template>
  <div class="nuxtWrapper">
    <nuxt v-if="init && $store.state.user.uid"/>
    <Navigator v-if="$store.state.user.uid"></Navigator>
    <Login v-if="init && !$store.state.user.uid"></Login>
  </div>
</template>

<script>
import Navigator from '~/components/navigator.vue';
import Login from '~/components/login/home.vue';

export default {
  components: {
    Navigator,
    Login,
  },
  data() {
    return {
      init: false,
    };
  },
  mounted() {
    const lang = this.$cookies.get('locale') || 'en';
    this.$store.commit('SET_LANG', lang);
    const user = this.$cookies.get('user');
    if (user) {
      this.$store.commit('setUserId', user);
    }
    if (!user) {
      this.$router.replace('/');
    }
    this.$nextTick(() => {
      this.init = true;
    });
  },
};
</script>

<style lang="scss">
  html, body{
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .nuxtWrapper{
    height: 100%;
  }
  #__nuxt, #__layout{
    height: 100%;
    width: 100%;
  }
  .scrollable{
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    &.navi{
      padding-bottom: 44px;
      padding-bottom: calc(constant(safe-area-inset-bottom) + 44px);
      padding-bottom: calc(env(safe-area-inset-bottom) + 44px);
    }
  }
  .tabWrapper{
    height: 100%;
    width: 100%;
  }
  /* VUE transitions */
  .slide-bottom-fade-enter-active,
  .slide-bottom-fade-leave-active{
    transition: all .3s ease;
  }
  .slide-bottom-fade-enter, .slide-bottom-fade-leave-to{
    transform: translateY(500px);
  }
  /* VUE transitions */
</style>
