<template>
  <div>
    <div>채팅방리스트</div>
    <nuxt-link :to="{ name: isIos ? 'chat-ios-roomId' : 'chat-aos-roomId', params: { roomId: 0 } }">0</nuxt-link>
    <chat-room
      v-if="!isIos && $route.params.roomId !== undefined"
    ></chat-room>
  </div>
</template>

<script>
import ChatRoom from "~/components/chatRoom_aos";

export default {
  components: {ChatRoom},
  data() {
    return {
      isIos: window.navigator.userAgent.indexOf('bpIos') >= 0,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
