<template>
  <div class="feedContentWrapper">
    <div class="fixTop" :class="fade ? 'fade' : ''">
      <div class="header">
        <button @click="$router.back()"></button>
      </div>
    </div>
    <div class="bg" :class="{
      animation: animation,
      second: parseInt($route.params.feedId) % 2 === 0,
    }"></div>
    <div class="scrollable" ref="feedContentWrapper">
      <div class="content">
        <div v-for="x in 30" :key="x">asd</div>
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
      &.second{
        background-image: url(~assets/img/cafe2.jpg);
      }
      &.animation {
        animation: movePic 20s linear infinite;
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
        > button{
          background-image: url(~assets/img/chevron-left.svg);
          background-position: center center;
          background-size: 24px;
          background-repeat: no-repeat;
          float: left;
          width: 44px;
          height: 44px;
          background-color: transparent;
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
