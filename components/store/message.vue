<template>
  <transition name="fade" mode="out-in">
    <div id="messageWrap" class="message">
      <div class="scrollable">
        <div class="top">
          <div class="checkIcon">
            <div class="check"></div>
          </div>
          <div class="title">{{ $t('bookingSuccess.success') }}</div>
          <div class="info">
            <div class="email">{{bookData.email}}</div>
            <div class="comment" v-html="$t('bookingSuccess.comment')">
            </div>
          </div>
        </div>
        <div class="bookData">
          <div class="name">{{bookData.customerName}}</div>
          <div class="date">{{ moment(bookData.date).format('ll ddd') }}</div>
          <div class="route"><span>{{ bookData.departure }}</span><span class="arrow"></span><span>{{ bookData.arrival }}</span></div>
          <div v-if="bookData.remark" class="remark">{{ bookData.remark }}</div>
        </div>
      </div>
      <div class="gra"></div>
      <div class="btnBottom">
        <button @click="$router.replace('/')">OK</button>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';

export default {
  props: ['bookData'],
  data() {
    return {
      moment,
      iconScale: 1,
    };
  },
  mounted() {
    this.$bodyLock.lock();
    setTimeout(() => {
      this.iconScale = 1.2;
    }, 250);
  },
};
</script>

<style lang="scss" scoped>
  .message {
    height: 100vh;
    .scrollable{
      padding: 0 24px;
    }
    .gra{
      left: 0;
      right: 0;
      position: fixed;
      height: 69px;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 50%);
      bottom: 70px;
    }
    .top{
      display: flex;
      align-items: center;
      flex-flow: column;
      padding-top: 50px;
      .checkIcon {
        width: 55px;
        height: 55px;
        border-radius: 50px;
        background-color: #ff4208;
        display: flex;
        justify-content: center;
        align-items: center;
        .check{
          width: 28px;
          height: 28px;
          background-image: url(~assets/img/check.svg);
          background-size: 100% auto;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
      .title {
        margin-top: 16px;
        font-size: 26px;
        line-height: 39px;
        color: #000;
        font-weight: bold;
      }
      .info {
        margin-top: 9px;
        text-align: center;
        font-size: 16px;
        line-height: 24px;
        .email{
          color: #000;
          font-weight: bold;
        }
        .comment{
          color: #939499;
        }
      }
    }
    .bookData{
      margin-top: 102px;
      font-size: 16px;
      color: #000;
      padding-bottom: 140px;
      .name{
        font-weight: bold;
      }
      .date{
        margin-top: 16px;
      }
      .route{
        margin-top: 8px;
        line-height: 20px;
        display: flex;
        align-items: center;
        .arrow{
          display: inline-block;
          width: 15px;
          height: 20px;
          background-image: url(~assets/img/arrow-right.svg);
          background-size: 15px 15px;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 5px;
        }
      }
      .remark{
        margin-top: 16px;
      }
    }
    .btnBottom{
      position: fixed;
      width: 100%;
      height: 95px;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 50%);
      padding: 22px 21px;
      left: 0;
      right: 0;
      bottom: 44px;
      button{
        transition: .3s ease;
        width: 100%;
        height: 55px;
        border-radius: 6px;
        font-weight: bold;
        color: #fff;
        background-color: #ff4208;
      }
    }
  }
</style>
