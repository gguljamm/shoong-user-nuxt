<template>
  <section class="chatRoomWrapper">
    <div class="fixTop">
      <div class="header">
        <button @click="$router.back()"></button>
        {{ $t('chat.title') }}
      </div>
    </div>
    <div class="scrollable" ref="chatWrapper" :style="isInputFocus ? {
      'padding-bottom': 0,
    } : {}">
      <ul>
        <div v-if="loading" class="loader">loading</div>
        <li v-show="!loading" class="chatBox" v-for="(x, index) in chatList" :key="x.key" :class="x.user === userKey ? 'right' : 'left'">
          <div v-show="index === 0 || printDate(x) !== printDate(chatList[index - 1])"><div>{{ printDate(x) }}</div></div>
          <div>
            <div class="name" v-if="x.user !== userKey && (index === 0 || chatList[index - 1].user !== x.user)">
              {{ memberList[x.user] ? memberList[x.user].name : 'no_named' }}
              <span v-if="x.isNotice">| {{ $t('chat.answer') }}</span>
            </div>
            <div class="chatBubble">
              <div v-for="(line, key) in x.text.split('\n')" :key="`${index}_${key}`">{{ line }}</div>
              <div class="time"
                   v-if="x.time && ((index === chatList.length - 1 || chatList[index + 1].user !== x.user) || (index !== 0 && chatList[index + 1].user === x.user && chatList[index + 1].time - x.time > 180000) || !chatList[index - 1].time)"
              >{{ format.formatTime(x.time) }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="fixBottom" :style="isInputFocus ? {
      'padding-bottom': 0,
    } : {}">
      <div class="inputBox">
        <textarea v-model="inputText" placeholder="Message" @focusin="isInputFocus = true" @focusout="isInputFocus = false"></textarea>
        <button @click="chatSubmit()" :style="{ opacity: inputText.length > 0 ? 1 : 0 }"></button>
      </div>
    </div>
  </section>
</template>

<script>
import * as Firebase from 'firebase/app';
import 'firebase/database';
import format from '~/utils/format';

export default {
  data() {
    return {
      format,
      chatSocket: '',
      chatList: [],
      inputText: '',
      userKey: '',
      init: false,
      num: 0,
      timeout: null,
      loading: true,
      isInputFocus: false,
      memberList: {},
    };
  },
  methods: {
    printDate(val) {
      let date = new Date().getTime();
      if (val.time) {
        date = val.time;
      } else {
        for (let x = 0; x < this.chatList.length; x += 1) {
          if (this.chatList[x].time) {
            date = this.chatList[x].time;
            break;
          }
        }
      }
      return this.format.formatDate(date);
    },
    chatSubmit() {
      if (this.inputText.length === 0) {
        return;
      }
      if (!this.userKey) {
        alert('error!');
        return;
      }
      const text = this.inputText;
      const time = new Date().getTime();
      Firebase.database().ref(`/groupChat/${this.$store.state.locale || 'en'}/chat`).push({
        text,
        user: this.userKey,
        time,
      });
      this.inputText = '';
    },
    scrollBottom() {
      // window.scrollTo(0, window.document.body.clientHeight);
      this.$refs.chatWrapper.scrollTo(0, this.$refs.chatWrapper.scrollHeight);
      this.timeout = null;
    },
  },
  mounted() {
    this.$bodyLock.lock();
    this.$nextTick(() => {
      this.init = true;
    });
    const init = () => {
      if (this.chatSocket) {
        this.chatSocket.off();
      }
      this.chatSocket = Firebase.database().ref(`/groupChat/${this.$store.state.locale || 'en'}/chat`);
      const cbDisplayMessages = (data) => {
        this.loading = false;
        const v = data.val();
        this.chatList.push({
          user: v.user,
          text: v.text,
          time: v.time,
        });
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.$nextTick(this.scrollBottom);
        }, 100);
      };
      this.chatSocket.limitToLast(50).on('child_added', cbDisplayMessages.bind(this));
      if (this.memberSocket) {
        this.memberSocket.off();
      }
      this.memberSocket = Firebase.database().ref(`/groupChat/${this.$store.state.locale || 'en'}/member`);
      this.memberSocket.on('value', (snap) => {
        const member = snap.val();
        if (!member || Object.keys(member).indexOf(this.userKey) === -1) {
          Firebase.database().ref(`/groupChat/${this.$store.state.locale || 'en'}/member/${this.userKey}`).set({
            name: 'matthew',
            pic: 'asd',
          });
        }
        this.memberList = member;
      });
    };
    if (!this.$store.state.user.uid) {
      const interval = setInterval(() => {
        if (this.$store.state.user.uid) {
          this.userKey = this.$store.state.user.uid;
          init();
          clearInterval(interval);
        }
      }, 500);
    } else {
      this.userKey = this.$store.state.user.uid;
      init();
    }
  },
  beforeDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.chatSocket) {
      this.chatSocket.off();
    }
  },
};
</script>

<style lang="scss" scoped>
  .chatRoomWrapper{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    .fixTop{
      z-index: 10;
      background-color: #000;
      box-shadow: 0 0 2px 1px rgba(0,0,0,.3);
      .header{
        line-height: 44px;
        color: #FFF;
        height: 44px;
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
            background-image: url(~assets/img/chevron-left-white.svg);
            left: 0;
          }
          &:nth-of-type(2){
            right: 0;
            font-size: 12px;
          }
        }
      }
    }
    .scrollable{
      background-color: #ebecf1;
      > ul{
        padding: 44px 12px 63px;
        li.chatBox{
          margin-bottom: 10px;
          > div:first-child{
            padding: 8px 0;
            font-size: 12px;
            text-align: center;
            position: relative;
            &:after{
              display: block;
              content: "";
              width: 100vw;
              left: 0;
              position: absolute;
              transform: translateY(-12px);
              z-index: 0;
              border-bottom: 1px solid #cccdd1;
            }
            > div{
              display: inline-block;
              z-index: 1;
              position: relative;
              line-height: 16px;
              padding: 4px 12px;
              background-color: #ebecf1;
            }
          }
          > div:nth-of-type(2){
            overflow: auto;
            .name{
              font-size: 14px;
              padding-top: 4px;
              font-weight: bold;
              margin-bottom: 6px;
              color: black;
              > span{
                font-size: 12px;
                color: #939499;
                font-weight: normal;
              }
            }
            .chatBubble{
              word-break: break-all;
              font-size: 14px;
              line-height: 20px;
              background-color: #f8f9fb;
              border-radius: 20px;
              display: inline-block;
              padding: 10px 20px;
              max-width: 80%;
              position: relative;
              > div:not(.time){
                min-height: 20px;
              }
              .time{
                position: absolute;
                bottom: 0;
                right: -68px;
                width: 60px;
                font-size: 11px;
                color: #939499;
                overflow: visible;
                white-space: nowrap;
              }
            }
          }
          &.left .chatBubble{
            border-top-left-radius: 0 !important;
          }
          &.right .chatBubble{
            float: right;
            border-top-right-radius: 0 !important;
            background-color: #ff4208 !important;
            color: #FFF !important;
            .time{
              text-align: right;
              left: -68px;
            }
          }
        }
      }
    }
    .fixBottom{
      z-index: 1;
      background-color: #ffffff;
      .inputBox{
        height: 63px;
        padding: 10px 21px;
        textarea{
          padding-top: 11px;
          padding-left: 16px;
          padding-right: 39px;
          padding-bottom: 5px;
          -webkit-user-modify: read-write-plaintext-only;
          height: 43px;
          border-radius: 27.5px;
          border: solid 1px #cccdd1;
          background-color: #ffffff;
          width: 100%;
          resize: none;
        }
        > button{
          transition: .1s ease;
          position: absolute;
          top: 14px;
          right: 25px;
          width: 35px;
          height: 35px;
          border-radius: 100%;
          background-color: #ff4208;
          background-image: url(~assets/img/arrow-right-white.svg);
          background-position: center center;
          background-size: 22px;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .loader {
    font-size: 10px;
    margin: 40px auto;
    text-indent: -9999em;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f40000;
    background: -moz-linear-gradient(left, #f40000 10%, rgba(244,0,0, 0) 42%);
    background: -webkit-linear-gradient(left, #f40000 10%, rgba(244,0,0, 0) 42%);
    background: -o-linear-gradient(left, #f40000 10%, rgba(244,0,0, 0) 42%);
    background: -ms-linear-gradient(left, #f40000 10%, rgba(244,0,0, 0) 42%);
    background: linear-gradient(to right, #f40000 10%, rgba(244,0,0, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #f40000;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: #ebecf1;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
