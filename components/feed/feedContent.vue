<template>
  <div class="feedContentWrapper">
    <div class="fixTop" :class="fade ? 'fade' : ''">
      <div class="header">
        <button @click="$router.back()"></button>
        <button @click="$router.back()"></button>
      </div>
    </div>
    <div class="bg" :class="{
      animation: animation,
      second: parseInt($route.params.feedId) % 2 === 0,
    }">
      <div>
        <div>
          <div>카페투어</div>
          <div>숨어있는<br>힙지로 갬성카페</div>
          <div>
            <span>#힙지로</span>
            <span>#뉴트로갬성</span>
            <span>#카페</span>
          </div>
        </div>
        <button class="bookMark"></button>
      </div>
    </div>
    <div class="scrollable" ref="feedContentWrapper">
      <div class="content">
        <div v-for="x in 30" :key="x">내용</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      animation: true,
      fade: false,
    };
  },
  methods: {
    scroll(e) {
      this.fade = e.target.scrollTop >= 401;
    },
  },
  mounted() {
    this.$bodyLock.lock();
    this.$refs.feedContentWrapper.addEventListener('scroll', this.scroll);
  },
  beforeDestroy() {
    this.animation = false;
    this.$refs.feedContentWrapper.removeEventListener('scroll', this.scroll);
  },
};
</script>

<style lang="scss" scoped>
  .feedContentWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    z-index: 20;
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height:445px;
      background-image: url(~assets/img/cafe.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      z-index: 0;
      color: #FFF;
      &.second{
        background-image: url(~assets/img/cafe2.jpg);
      }
      &.animation {
        animation: movePic 20s linear infinite;
      }
      > div{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.33);
        > div:first-of-type{
          position: absolute;
          bottom: 40px;
          left: 25px;
          right: 25px;
          > div:first-of-type{
            display: inline-block;
            border-radius: 15px;
            height: 29px;
            line-height: 29px;
            padding: 0 12px;
            font-size: 14px;
            background-color: rgba(255, 255, 255, .23);
          }
          > div:nth-of-type(2){
            margin-top: 12px;
            font-size: 34px;
            line-height: 41px;
            margin-bottom: 12px;
          }
          > div:nth-of-type(3){
            font-size: 18px;
            line-height: 21px;
          }
        }
      }
    }
    > .scrollable{
      padding-top: 445px;
      z-index: 1;
      position: relative;
      > .content{
        background-color: #FFF;
        > div{
          padding: 20px;
        }
      }
    }
    .fixTop{
      z-index: 5;
      transition: background-color .2s;
      .header{
        height: 44px;
        > button:first-child{
          background-image: url(~assets/img/chevron-left.svg);
          background-position: center center;
          background-size: 24px;
          background-repeat: no-repeat;
          float: left;
          width: 44px;
          height: 44px;
        }
        > button:nth-child(2){
          width: 44px;
          height: 44px;
          float: right;
          background-repeat: no-repeat;
          background-size: 24px;
          background-position: center center;
          background-image: url(~assets/img/bookmark_black.svg);
        }
      }
      &.fade{
        background-color: #FFF;
      }
    }
  }
  @keyframes movePic {
    from {
      background-position: 0 center;
    }
    50% {
      background-position: 100% center;
    }
    to {
      background-position: 0 center;
    }
  }
</style>
