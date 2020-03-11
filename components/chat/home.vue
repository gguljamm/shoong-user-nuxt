<template>
  <div class="scrollable navi chatWrapper">
    <ul>
      <li @click="submit('faq')">
        <div class="img"></div>
        <div>Shoong team</div>
      </li>
      <li>
        <div class="img"></div>
        <div>Shoonger in Korea</div>
      </li>
    </ul>
    <chat-room
      v-if="$route.params.roomId === 'faq'"
    ></chat-room>
  </div>
</template>

<script>
import ChatRoom from './chatRoom';

export default {
  components: { ChatRoom },
  data() {
    return {};
  },
  methods: {
    submit() {
      this.$router.push('/chat/faq');
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
  .chatWrapper {
    background-color: rgb(248, 249, 251);
    > ul {
      > li {
        height: 95px;
        background-color: #FFF;
        margin-bottom: 8px;
        padding: 25px 0 25px 113px;
        cursor: pointer;
        position: relative;
        .img{
          width: 63px;
          height: 63px;
          background-color: rgb(235, 236, 241);
          border-radius: 32px;
          position: absolute;
          top: 16px;
          left: 24px;
        }
      }
    }
  }
</style>
