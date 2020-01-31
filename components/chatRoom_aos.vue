<template>
  <div class="popup">
    <section class="container" :class="init ? 'active' : ''">
      <div class="header">
        <button @click="$router.back()"></button>
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
      <div class="inputBox">
        <textarea v-model="inputText"></textarea>
        <button @click="chatSubmit()"></button>
      </div>
      <set-user-name
        v-if="setUserNamePopup"
        @set-user-name="setUserName"
        :userName="userList[userKey] ? userList[userKey].name : ''"
      ></set-user-name>
    </section>
  </div>
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
        isScrollBottom: true,
      };
    },
    methods: {
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
      bodyScroll() {
        this.isScrollBottom = window.document.documentElement.scrollTop + window.innerHeight === window.document.body.scrollHeight
      },
      keyboardChange() {
        if (this.isScrollBottom) {
          this.scrollBottom();
        }
      },
    },
    mounted() {
      this.originSize = window.innerHeight;
      // this.scrollPosition = window.pageYOffset;
      // window.document.body.classList.add('disable-scroll');
      // window.document.body.style.top = `-${this.scrollPosition}px`;
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
      window.addEventListener('scroll', this.bodyScroll);
      window.addEventListener('resize', this.keyboardChange);
    },
    beforeDestroy() {
      // window.document.body.style.removeProperty('top');
      // window.document.body.classList.remove('disable-scroll');
      // window.scrollTo(0, this.scrollPosition);
      if (this.chatSocket) {
        this.chatSocket.off();
      }
      if (this.memberSocket) {
        this.memberSocket.off();
      }
      window.removeEventListener('scroll', this.bodyScroll);
      window.removeEventListener('resize', this.keyboardChange);
    },
  }
</script>

<style lang="scss" scoped>
.popup{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
  overflow: hidden;
  z-index: 10;
  .container{
    overflow: hidden;
    position: absolute;
    background-color: #FFF;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateX(100%);
    transition: .3s transform ease;
    &.active{
      transform: translateX(0%);
    }
    .header{
      box-shadow: 0 0 2px 1px rgba(0,0,0,.3);
      z-index: 1;
      background-color: #FFF;
      height: 44px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
      padding: 12px 12px 0;
      top: 44px;
      bottom: 44px;
      left: 0;
      right: 0;
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
      display: flex;
      background-color: #FFF;
      height: 44px;
      > textarea{
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
        width: 44px;
        background-image: url(~assets/img/play.svg);
        background-position: center bottom 10px;
        background-size: 24px;
        background-repeat: no-repeat;
        background-color: rgb(255, 145, 89);
      }
    }
  }
}
</style>

