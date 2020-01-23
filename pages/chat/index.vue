<template>
  <div>
    <div>채팅방리스트</div>
    <nuxt-link :to="{ name: 'chat-roomId', params: { roomId: 0 } }">0</nuxt-link>
    <chat-room
      v-if="$route.params.roomId !== undefined"
    ></chat-room>
  </div>
</template>

<script>
import ChatRoom from "~/components/chatRoom";

export default {
  components: {ChatRoom},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
