<template>
  <home
    v-if="page === 'home'"
    @changePage="changePage"
  ></home>
  <book-control
    v-else
    @changePage="changePage"
  ></book-control>
</template>

<script>
import home from '~/components/store/home.vue';
import BookControl from '~/components/store/bookControl.vue';

export default {
  components: {
    home,
    BookControl,
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
