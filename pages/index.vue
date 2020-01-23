<template>
  <div>
    <feed-board></feed-board>
    <button class="chatBtn" @click="$router.push('/chat')"></button>
  </div>
</template>

<script>
import FeedBoard from '~/components/feedBoard.vue';

export default {
  components: {
    FeedBoard,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
  .chatBtn{
    position: fixed;
    bottom: 56px;
    right: 12px;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background-color: #fff;
    z-index: 9;
    background-image: url(~assets/img/chat_bubble.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 24px;
    box-shadow: 1px 1px 3px 2px rgba(0,0,0,.1);
  }
</style>
