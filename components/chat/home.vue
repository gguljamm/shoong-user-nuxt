<template>
  <div class="chatWrapper">
    <div class="fixTop">
      <h2>Chatting</h2>
    </div>
    <div class="scrollable navi">
      <ul>
        <transition name="fade">
          <div class="notice" v-if="noticeShow">
            <div>
              <div></div>
              <div>
                <h3>코로나 알리미</h3>
                <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
              </div>
              <button @click="noticeShow = false"></button>
            </div>
          </div>
        </transition>
        <li @click="submit('faq')">
          <div class="img"></div>
          <div class="firstLine">
            <div>Shoong team</div>
            <div>{{ questionLastMsg.stamp ? stampToString(questionLastMsg.stamp) : '' }}</div>
          </div>
          <div class="secondLine">
            {{ questionLastMsg.lastmsg }}
          </div>
        </li>
        <li @click="submit('group')">
          <div class="img"></div>
          <div class="firstLine">
            <div>Shoong users <span>{{ groupLength }}</span></div>
            <div></div>
          </div>
          <div class="secondLine"></div>
        </li>
      </ul>
    </div>
    <transition name="right-popup" mode="out-in">
      <chat-room
        v-if="$route.params.roomId === 'faq'"
      ></chat-room>
      <group-chat-room
        v-if="$route.params.roomId === 'group'"
      ></group-chat-room>
    </transition>
  </div>
</template>

<script>
import Firebase from 'firebase/app';
import ChatRoom from './chatRoom';
import GroupChatRoom from './groupChatRoom';

export default {
  components: { ChatRoom, GroupChatRoom },
  data() {
    return {
      noticeShow: true,
      chatSocket: null,
      questionLastMsg: {},
      groupLength: '',
    };
  },
  methods: {
    submit(param) {
      this.$router.push(`/chat/${param}`);
    },
    stampToString(stamp) {
      const time = parseInt(stamp, 10);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let text = '';
      if (time - today.getTime() >= 0) {
        let hour = new Date(stamp).getHours();
        const ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour > 12 ? hour - 12 : hour;
        text = `${hour}:${new Date(stamp).getMinutes()} ${ampm}`;
      } else if (today.getTime() - time < 114500000) {
        text = 'yesterday';
      } else {
        const d = parseInt((today.getTime() - time) / 114500000, 10);
        text = `${d + 1} days ago`;
      }
      return text;
    },
  },
  mounted() {
    this.$bodyLock.lock();
    const uid = this.$store.state.user ? this.$store.state.user.uid : null;
    if (this.chatSocket) {
      this.chatSocket.off();
    }
    if (uid) {
      this.chatSocket = Firebase.database().ref(`/userList/${uid}/chatList/question`);
      this.chatSocket.on('value', (snap) => {
        const val = snap.val();
        if (val) {
          this.questionLastMsg = val;
        }
      });
    }
    Firebase.database().ref(`/groupChat/${this.$store.state.locale || 'en'}/member`).once('value', (snap) => {
      const val = snap.val();
      console.log(val);
      if (val) {
        this.groupLength = Object.keys(val).length;
      }
    });
  },
  beforeDestroy() {
    if (this.chatSocket) {
      this.chatSocket.off();
    }
  },
};
</script>

<style lang="scss" scoped>
  .chatWrapper {
    height: 100%;
    .fixTop{
      z-index: 2;
      padding: 60px 20px 10px;
      background-color: #FFF;
      h2{
        font-size: 30px;
        line-height: 39px;
        font-weight: bold;
      }
    }
    .scrollable{
      > ul {
        padding: 119px 0 20px;
        > li {
          height: 72px;
          background-color: #FFF;
          margin-bottom: 1px;
          padding: 16px 20px 16px 78px;
          cursor: pointer;
          position: relative;
          .img{
            width: 46px;
            height: 46px;
            background-color: #ff4208;
            border-radius: 23px;
            position: absolute;
            top: 13px;
            left: 20px;
            background-image: url(~assets/img/logo_1.svg);
            background-repeat: no-repeat;
            background-size: 32px;
            background-position: center center;
          }
          .firstLine{
            display: flex;
            > div:first-child{
              flex: auto;
              > span{
                color: rgb(147, 148, 153);
              }
            }
            > div:nth-of-type(2){
              flex: 0 0 80px;
              text-align: right;
              color: #cccdd1;
              font-size: 12px;
            }
          }
          .secondLine{
            margin-top: 4px;
            color: #939499;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }
        }
      }
      .notice{
        padding: 0 20px 10px 20px;
        > div{
          border-radius: 6px;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
          > div:first-child{
            flex: 0 0 40px;
            background-color: #ff4208;
            position: relative;
            &:before{
              content: '';
              position: absolute;
              top: 8px;
              left: 8px;
              width: 24px;
              height: 24px;
              background-image: url(~assets/img/alertTriangle_1.svg);
              background-size: 24px;
              background-position: center center;
              background-repeat: no-repeat;
            }
          }
          > div:nth-of-type(2){
            flex: 1;
            padding: 20px 10px 16px;
            > h3{
              margin-bottom: 6px;
            }
          }
          > button{
            position: absolute;
            width: 14px;
            height: 14px;
            top: 10px;
            right: 10px;
            background-image: url(~assets/img/x_black.svg);
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 14px;
            opacity: .3;
          }
        }
      }
    }
  }
</style>
