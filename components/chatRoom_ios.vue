<template>
  <section class="container" :class="{
    onKeyboard: onKeyboard,
  }">
    <div class="header">
      <button @click="$router.back()"></button>
      {{ $route.path }}
      <button @click="setUserNamePopup = true">닉변경</button>
    </div>
    <ul ref="chatWrapper">
      <li class="chatBox" v-for="(x, index) in chatList" :key="x.key">
        <div>
          <div class="name" v-if="index === 0 || chatList[index - 1].user !== x.user">{{ userList[x.user] ? userList[x.user].name : '' }}</div>
          <div class="chatBubble">{{ x.text }}</div>
        </div>
      </li>
    </ul>
    <div class="inputBox" :style="onKeyboard ? {
      top: `${scrollHeight - 44}px`,
      bottom: 'unset'
    } : {}">
      <textarea v-model="inputText"
        @focus="focusIn()"
        @blur="focusOut()"
      ></textarea>
      <button @click="chatSubmit()"></button>
    </div>
    <set-user-name
      v-if="setUserNamePopup"
      @set-user-name="setUserName"
      :userName="userList[userKey] ? userList[userKey].name : ''"
    ></set-user-name>
  </section>
</template>

<script>
  import Firebase from 'firebase';
  import SetUserName from '~/components/setUserName.vue';

  export default {
    components: {
      SetUserName,
    },
    data() {
      return {
        chatSocket: '',
        chatList: [],
        userList: {},
        inputText: '',
        userKey: '',
        memberSocket: '',
        setUserNamePopup: false,
        init: false,
        onKeyboard: false,
        scrollHeight: 0,
        windowHeight: 0,
        num: 0,
      };
    },
    methods: {
      focusIn() {
        this.onKeyboard = true;
        this.scrollHeight = window.document.body.scrollHeight;
      },
      focusOut() {
        this.onKeyboard = false;
      },
      setUserName(userName) {
        Firebase.database().ref(`/chatList/${this.$route.params.roomId}/member`).child(this.userKey).set({
          name: userName,
        });
        this.setUserNamePopup = false;
      },
      chatSubmit() {
        if (!this.userKey) {
          alert('로그인 안됨 수고');
          return;
        }
        Firebase.database().ref(`/chatList/${this.$route.params.roomId}/chat`).push({
          text: this.inputText,
          user: this.userKey,
          time: new Date().getTime(),
        });
        this.inputText = '';
      },
      scrollBottom() {
        this.$refs.chatWrapper.scrollTo(0, this.$refs.chatWrapper.scrollHeight);
      },
      keyboardChange(event) {
        this.windowHeight = event.keyboardHeight + ++this.num;
      },
    },
    mounted() {
      window.document.getElementsByTagName('html')[0].classList.add('fixed');
      this.$nextTick(() => {
        this.init = true;
      });
      const init = async () => {
        if (this.memberSocket) {
          this.memberSocket.off();
        }
        const changeMember = (data) => {
          const obj = data.val() || {};
          this.userList = obj;
          if (!this.userList[this.userKey]) {
            this.setUserNamePopup = true;
          }
        };
        this.memberSocket = Firebase.database().ref(`/chatList/${this.$route.params.roomId}/member`)
        this.memberSocket.on('value', changeMember.bind(this));

        if (this.chatSocket) {
          this.chatSocket.off();
        }
        this.chatSocket = Firebase.database().ref(`/chatList/${this.$route.params.roomId}/chat`);
        const cbDisplayMessages = (data) => {
          const v = data.val();
          this.chatList.push({
            user: v.user,
            text: v.text,
          });
          this.$nextTick(this.scrollBottom);
        };
        this.chatSocket.limitToLast(50).on('child_added', cbDisplayMessages.bind(this));
      };
      if (!this.$store.state.userId) {
        const interval = setInterval(() => {
          if (this.$store.state.userId) {
            this.userKey = this.$store.state.userId;
            init();
            clearInterval(interval);
          }
        }, 500);
      } else {
        this.userKey = this.$store.state.userId;
        init();
      }
      window.addEventListener('keyboardDidShow', function (event) {
        alert(JSON.stringify(event));
      });
    },
    beforeDestroy() {
      window.document.getElementsByTagName('html')[0].classList.remove('fixed');
      if (this.chatSocket) {
        this.chatSocket.off();
      }
      if (this.memberSocket) {
        this.memberSocket.off();
      }
      window.removeEventListener('keyboardDidShow', this.keyboardChange);
    },
  }
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /*&.onKeyboard .header, &.onKeyboard .inputBox{*/
  /*  position: absolute;*/
  /*}*/
  &.onKeyboard .inputBox{
    height: 44px;
    padding-bottom: 0;
    > button{
      bottom: 0;
    }
  }
  &.onKeyboard > ul{
    bottom: 44px;
  }
  .header{
    box-shadow: 0 0 2px 1px rgba(0,0,0,.3);
    z-index: 1;
    background-color: #FFF;
    height: 44px;
    height: calc(constant(safe-area-inset-top) + 44px);
    height: calc(env(safe-area-inset-top) + 44px);
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    > button{
      position: absolute;
      bottom: 0;
      width: 44px;
      height: 44px;
      background-repeat: no-repeat;
      background-position: center center;
      &:nth-of-type(1){
        background-image: url(~assets/img/chevron-left.svg);
        left: 0;
      }
      &:nth-of-type(2){
        right: 0;
        font-size: 12px;
      }
    }
  }
  > ul{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    width: 100%;
    left: 0;
    padding: 12px 12px 0;
    top: 44px;
    top: calc(constant(safe-area-inset-top) + 44px);
    top: calc(env(safe-area-inset-top) + 44px);
    bottom: 44px;
    bottom: calc(constant(safe-area-inset-bottom) + 44px);
    bottom: calc(env(safe-area-inset-bottom) + 44px);
    background-color: rgb(155, 202, 166);
    .chatBox{
      margin-bottom: 10px;
      > div{
        .name{
          padding-top: 4px;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .chatBubble{
          font-size: 14px;
          line-height: 16px;
          background-color: #fff;
          border-radius: 20px;
          display: inline-block;
          padding: 8px 16px;
        }
      }
    }
  }
  .inputBox{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    background-color: #FFF;
    height: 44px;
    height: calc(constant(safe-area-inset-bottom) + 44px);
    height: calc(env(safe-area-inset-bottom) + 44px);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    > textarea{
      -webkit-user-modify: read-write-plaintext-only;
      margin-top: 4px;
      margin-bottom: 4px;
      flex: auto;
      width: 100%;
      border: 0;
      resize: none;
      padding-right: 64px;
      padding-left: 20px;
      line-height: 20px;
      padding-top: 8px;
      height: 36px;
    }
    > button{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      bottom: constant(safe-area-inset-bottom);
      bottom: env(safe-area-inset-bottom);
      width: 44px;
      background-image: url(~assets/img/play.svg);
      background-position: center bottom 10px;
      background-size: 24px;
      background-repeat: no-repeat;
      background-color: rgb(255, 145, 89);
    }
  }
}
</style>

