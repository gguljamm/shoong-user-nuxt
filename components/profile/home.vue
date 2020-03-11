<template>
  <div class="scrollable navi profileWrapper">
    {{ $t('main.localeTap') }}
    <div>
      <button @click="setLang('en')" :disabled="$store.state.locale === 'en'">en</button>
      <button @click="setLang('cn')" :disabled="$store.state.locale === 'cn'">cn</button>
      <button @click="setLang('jp')" :disabled="$store.state.locale === 'jp'">jp</button>
    </div>
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
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
