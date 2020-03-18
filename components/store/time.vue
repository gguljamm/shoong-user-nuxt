<template>
  <div class="timeWrap">
    <div class="fixTop">
      <div class="header">
        <button @click="$emit('backStep')"></button>
      </div>
    </div>
    <div class="timeBodyWrap">
      <div class="serviceTitle">
        <div class="intro">
          {{ $t('booking.time.title') }}
        </div>
        <div class="sub" v-html="$t('booking.time.subTitle')"></div>
      </div>
      <div class="contentWrap">
        <div class="content">
          <div class="title">{{ $t('booking.time.timeInputTitle') }}</div>
          <div class="selectWrap" @click="openPop">
            <input type="text" readonly class="timePicker" :value="selectTime ? selectTime : ''" :placeholder="selectTime ? selectTime : $t('booking.time.timeInputPlaceholder')">
            <div class="selectIcon"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pickerOn" class="mask" @click="closePop"></div>
    <transition name="slide-bottom-fade" mode="out-in">
      <div v-if="pickerOn" class="fixBottom popup-zIndex">
        <div class="selectTime">
          <div class="topInfo"><button @click="closePop"></button></div>
          <div class="info">
            <div class="title">{{ $t('booking.time.timePop.title') }}</div>
            <div class="sub" v-html="$t('booking.time.timePop.subTitle')"></div>
          </div>
          <timePicker
            :selectedTime="selectTime"
            @changeData="saveTime"
          ></timePicker>
          <div
            v-if="bookData && bookData.date && selectTime"
            class="timeInfo"
          >
            <div class="title">{{ $t('booking.time.timePop.infoTitle') }}</div>
            <div class="day">{{ moment(bookData.date).format('ll ddd') }}, {{ selectTime }}</div>
          </div>
          <div class="btnBottomPop">
            <button @click="closePop">OK</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="fixBottom">
      <div class="pageBottomBtnWrap">
        <button :class="selectTime ? 'active' : ''" @click="selectTime ? submit() : openPop()">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import timePicker from './timePicker.vue';

export default {
  props: ['bookData'],
  components: {
    timePicker,
  },
  data() {
    const selectTime = this.bookData && this.bookData.time;
    return {
      moment,
      pickerOn: false,
      selectTime,
    };
  },
  methods: {
    closePop() {
      const html = document.querySelector('html');
      html.style.position = '';
      html.style.overflow = '';
      this.pickerOn = false;
    },
    openPop() {
      const html = document.querySelector('html');
      html.style.position = 'fixed';
      html.style.overflow = 'hidden';
      this.pickerOn = true;
    },
    saveTime(time) {
      this.selectTime = time;
    },
    submit() {
      this.$emit('setData', this.selectTime);
    },
  },
  beforeDestroy() {
    const html = document.querySelector('html');
    html.style.position = '';
    html.style.overflow = '';
  },
};
</script>

<style lang="scss">
  .timeWrap {
    .bold {
      font-weight: bold;
    }
  }
</style>

<style lang="scss" scoped>
  .timeWrap{
    .popup-zIndex{
      z-index: 3;
    }
    a{
      display: block;
      text-decoration: none;
      color: inherit;
    }
    .serviceTitle{
      .intro{
        font-size: 30px;
        font-weight: bold;
        line-height: 39px;
        color: #000;
      }
      .sub{
        margin-top: 20px;
        font-size: 15px;
        color: #939499;
        line-height: 22px;
      }
    }
    .timeBodyWrap{
      padding: 22px 24px 120px 24px;
      margin-top: 50px;
      .contentWrap{
        margin-top: 50px;
        .content{
          margin-top: 30px;
          .selectWrap{
            position: relative;
            margin-top: 10px;
            .selectIcon{
              position: absolute;
              top: calc(50% - 20px);
              right: 6px;
              width: 40px;
              height: 40px;
              background-image: url(~assets/img/ic-more.svg);
              background-size: 22px 22px;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          &:first-of-type{
            margin-top: 0;
          }
          .title{
            font-size: 15px;
            color: #000;
          }
          input{
            width:100%;
            height: 64px;
            border-radius: 4px;
            border: solid 1px #ebecf1;
            background-color: #f8f9fb;
            font-size: 20px;
            padding: 20px;
            cursor: pointer;
            &::placeholder{
              color: #939499;
            }
          }
        }
      }
    }
    .mask{
      z-index: 3;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.39);
    }
    .selectTime {
      width: 100%;
      z-index: 3;
      background-color: #fff;
      padding-bottom: 22px;

      .topInfo {
        line-height: 44px;
        background-color: #FFF;
        height: 44px;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        padding: 8px 0 0 4px;

        > button {
          width: 44px;
          height: 44px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 20px 20px;
          padding: 8px 4px 0 0;

          &:nth-of-type(1) {
            background-image: url(~assets/img/x_black.svg);
          }
        }
      }

      .info {
        margin-top: 10px;
        padding: 0 24px;

        .title {
          font-size: 20px;
          color: #000;
        }

        .sub {
          line-height: 18px;
          font-size: 14px;
          color: #939499;
          margin-top: 8px;
        }
      }
      .timeInfo{
        line-height: 18px;
        padding: 0 24px;
        margin-top: 20px;
        font-size: 14px;
        color: #000;
        .title{
          font-weight: bold;
        }
      }
      .btnBottomPop{
        padding: 22px 21px 0 21px;
        button{
          width: 100%;
          height: 55px;
          border-radius: 6px;
          font-weight: bold;
          color: #fff;
          background-color: #ff4208;
        }
      }
    }
  }
</style>
