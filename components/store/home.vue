<template>
  <div
    v-if="init"
    class="nuxtWrapper scrollable navi"
  >
    <div class="container">
      <div class="mask containerMask">
        <a href="/" class="logo"></a>
        <div class="intro" v-html="$t('main.intro')">
        </div>
        <div class="bottomContent">
          <button @click="moveBooking" class="bookBtn">{{$t('main.booking')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        init: false,
      };
    },
    methods: {
      moveBooking() {
        this.$emit('changePage', 'booking');
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.init = true;
      });
    },
  };
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    background-image: url(~assets/img/main.png);
    background-repeat: no-repeat;
    background-size: auto 100%;
    animation-duration: 2.7s;
    animation-delay: .3s;
    animation-name: car-ani;
    animation-fill-mode: forwards;
    position: relative;
    .mask{
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
    }
    .containerMask{
      padding: 32px 24px;
      a.logo{
        background-image: url(https://cdn.bringprice.com/image/shoong/logo.svg);
        background-repeat: no-repeat;
        background-size: contain;
        width: 100px;
        height: 40px;
        display: block;
      }
      .intro{
        margin-top: 120px;
        font-size: 30px;
        font-weight: 500;
        color: #fff;
      }
      .bottomContent{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 22px;
        .bookBtn{
          width: calc(100% - 42px);
          font-size: 18px;
          color: #fff;
          font-weight: 600;
          height: 55px;
          display: block;
          margin: 0 auto;
          background-color: #e12f00;
          border-radius: 6px;
        }
      }
    }
    @keyframes car-ani {
      from{
        background-position: 0 center;
      }
      to{
        background-position: -120px center;
      }
    }
  }
</style>
