<template>
  <div class="checkDataWrap">
    <div class="fixTop">
      <div class="header">
        <button @click="$emit('backStep')"></button>
      </div>
    </div>
    <div class="checkDataBodyWrap">
      <div class="serviceTitle">
        <div class="intro" v-html="$t('booking.checkData.title')"></div>
      </div>
      <div class="contentWrap">
        <div
          v-for="(keyName, index) in Object.keys(checkData)"
          :key="index"
          class="info"
          :class="keyName"
        >
          <div
            v-if="checkData[keyName]"
            class="infoWrap"
          >
            <div class="name">{{ $t(`booking.checkData.info.${keyName}`) }}</div>
            <div class="val">{{ checkData[keyName] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataConfirm" class="mask" @click="closePop"></div>
    <transition name="slide-bottom-fade" mode="out-in">
      <div v-if="dataConfirm" class="fixBottom popup-zIndex">
        <div class="dataConfirm">
          <div class="topInfo"><button @click="closePop"></button></div>
          <div class="info">
            <div class="title">{{ $t('booking.checkData.checkDataPop.title') }}</div>
            <div class="sub">{{ $t('booking.checkData.checkDataPop.subTitle') }}</div>
          </div>
          <div class="contentWrap">
            <div class="email">{{ bookData.userInfo.email }}</div>
            <div class="selectBtn">
              <button @click="emailConfirm = 'yes'" :class="emailConfirm === 'yes' ? 'active' : ''" class="yes">{{ $t('booking.checkData.checkDataPop.yes') }}</button>
              <button @click="emailConfirm = 'no'" :class="emailConfirm === 'no' ? 'active' : '' " class="no">{{ $t('booking.checkData.checkDataPop.no') }}</button>
            </div>
          </div>
          <div class="btnBottomPop">
            <button @click="emailConfirm ? checkEmail() : ''" :class="emailConfirm ? 'active' : ''">OK</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="fixBottom">
      <div class="pageBottomBtnWrap">
        <button @click="openPop" class="active">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookData'],
  data() {
    return {
      dataConfirm: false,
      emailConfirm: '',
      checkData: {
        name: this.bookData.userInfo.name,
        date: this.bookData.date,
        time: this.bookData.time,
        from: this.bookData.route.direction === 'TO' ? this.bookData.route.airport : this.bookData.location,
        to: this.bookData.route.direction === 'TO' ? this.bookData.location : this.bookData.route.airport,
        companions: this.bookData.userInfo.headCount,
        request: this.bookData.userInfo.remark,
      },
    };
  },
  methods: {
    closePop() {
      const html = document.querySelector('html');
      html.style.position = '';
      html.style.overflow = '';
      this.dataConfirm = false;
    },
    openPop() {
      // const html = document.querySelector('html');
      // html.style.position = 'fixed';
      // html.style.overflow = 'hidden';
      this.dataConfirm = true;
    },
    checkEmail() {
      if (this.emailConfirm === 'yes') {
        this.booking();
      } else {
        this.$emit('changePage', 'userInfo');
      }
    },
    booking() {
      this.$emit('booking');
    },
  },
  beforeDestroy() {
    // const html = document.querySelector('html');
    // html.style.position = '';
    // html.style.overflow = '';
  },
};
</script>

<style lang="scss" scoped>
  .checkDataWrap{
    .popup-zIndex{
      z-index: 3;
    }
    .checkDataBodyWrap{
      padding: 22px 16px 120px 16px;
      margin-top: 50px;
      .serviceTitle{
        .intro{
          font-size: 30px;
          font-weight: bold;
          line-height: 39px;
          color: #000;
        }
      }
      .contentWrap {
        margin-top: 30px;
        .info{
          margin-top: 30px;
          font-size: 16px;
          &:first-of-type{
            margin-top: 0;
          }
          .infoWrap{
            display: flex;
            .name{
              width: 50%;
              color: #939499;
            }
            .val{
              width: 50%;
              color: #000;
              font-weight: bold;
            }
            &.request{
              display: block;
              .name, .val{
                width: 100%;
              }
              .val{
                margin-top: 10px;
              }
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
    .dataConfirm {
      width: 100%;
      z-index: 3;
      background-color: #fff;
      padding-bottom: 22px;
      margin-bottom: 44px;

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
          font-size: 14px;
          color: #939499;
          margin-top: 8px;

          .bold {
            font-weight: bold;
          }
        }
      }
      .contentWrap{
        margin-top: 30px;
        padding: 0 24px;
        .email{
          font-weight: bold;
          font-size: 16px;
          color: #000;
        }
        .selectBtn{
          margin-top: 20px;
          display: flex;
          button{
            display: block;
            width: 50%;
            height: 56px;
            color: #939499;
            background-color: #fff;
            border: 1px solid #cccdd1;
            font-size: 14px;
            &.yes{
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            &.no{
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
            &:first-of-type{
              border-right: none;
            }
            &.active{
              color: #000;
              border: 1px solid #000;
              font-weight: 500;
            }
          }
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
          background-color: #e7b6a7;
          transition: .3s ease;
          &.active{
            background-color: #ff4208;
          }
        }
      }
    }
  }
</style>
