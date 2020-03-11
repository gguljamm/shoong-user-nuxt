<template>
  <div class="nuxtWrapper">
    <home
      v-if="page === 'home'"
      @changePage="changePage"
    ></home>
    <bookControl
      v-else
    ></bookControl>
  </div>
</template>

<script>
import home from '~/components/store/home.vue';
import bookControl from '~/components/store/bookControl.vue';

export default {
  components: {
    home,
    bookControl,
  },
  data() {
    return {
      page: 'home',
    };
  },
  methods: {
    changePage(page) {
      // console.log(page);
      this.page = page;
    },
  },
};
</script>

<style lang="scss">
</style>
