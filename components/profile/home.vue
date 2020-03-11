<template>
  <div class="scrollable navi profileWrapper" style="padding: 20px;">
    {{ $t('main.localeTap') }}
    <div class="temp">
      <button @click="setLang('en')" :disabled="$store.state.locale === 'en'">en</button>
      <button @click="setLang('cn')" :disabled="$store.state.locale === 'cn'">cn</button>
      <button @click="setLang('jp')" :disabled="$store.state.locale === 'jp'">jp</button>
    </div>
    <button @click="logout()" style="width: 100%; background-color: #ff4208; color: #FFF; margin-top: 40px; line-height: 40px;">log out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setLang(lang) {
      this.$store.commit('SET_LANG', lang);
      this.$cookies.set('locale', lang);
    },
    logout() {
      this.$store.commit('setUserId', {});
      this.$cookies.set('user', undefined);
      if (this.$route.path !== '/') {
        this.$router.replace('/');
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
  .profileWrapper{
    .temp{
      margin-top: 20px;
      display: flex;
      button{
        border: 1px solid #eee;
        background-color: #FFF;
        flex: auto;
        height: 40px;
      }
    }
  }
</style>
