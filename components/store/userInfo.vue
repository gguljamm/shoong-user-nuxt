<template>
  <div class="requestWrap">
    <div class="header">
      <button @click="$emit('backStep')"></button>
    </div>
    <div class="serviceTitle">
      <div class="intro">
        {{ $t('booking.userInfo.title') }}
      </div>
      <div class="sub">
        {{ $t('booking.userInfo.subTitle') }}
      </div>
    </div>
    <div class="contentWrap">
      <div class="content">
        <div class="title">{{ $t('booking.userInfo.emailInputTitle') }}</div>
        <input type="text" v-bind:value="email" v-on:input="email = $event.target.value" class="email" :placeholder="$t('booking.userInfo.emailInputPlaceholder')">
        <transition name="fade">
          <div v-if="email && isValidEmail" class="err">{{ $t('booking.userInfo.emailErr') }}</div>
        </transition>
      </div>
      <div class="content">
        <div class="title">{{ $t('booking.userInfo.nameInputTitle') }}</div>
        <input type="text" v-bind:value="name" v-on:input="name = $event.target.value" class="name" :placeholder="$t('booking.userInfo.nameInputPlaceholder')">
      </div>
      <div class="content">
        <div class="title">{{ $t('booking.userInfo.companionsInputTitle') }}</div>
        <div class="selectWrap">
          <select class="companions" v-model="headCount">
            <option
              v-for="x in 12"
              :key="x"
              :value="x"
            >{{x}}</option>
          </select>
          <div class="selectIcon"></div>
        </div>
      </div>
      <div class="content">
        <div class="title">{{ $t('booking.userInfo.requestInputTitle') }}</div>
        <textarea type="text" v-bind:value="request" v-on:input="request = $event.target.value" class="request" :placeholder="$t('booking.userInfo.requestInputPlaceholder')">
        </textarea>
      </div>
    </div>
    <div v-if="isValidBtn" class="btnBottom">
      <button @click="active ? saveLocation() : ''" :class="active ? 'active' : ''">NEXT</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookData', 'isValidBtn'],
  data() {
    const email = this.bookData && this.bookData.userInfo.email;
    const name = this.bookData && this.bookData.userInfo.name;
    const headCount = this.bookData && this.bookData.userInfo.headCount ? this.bookData.userInfo.headCount : 1;
    const request = this.bookData && this.bookData.userInfo.remark;
    return {
      email,
      name,
      headCount,
      request,
    };
  },
  computed: {
    active() {
      return this.email && this.name && this.headCount && !this.isValidEmail;
    },
    isValidEmail() {
      const regExp = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      let returnVal = false;
      if (!this.email.match(regExp)) {
        returnVal = true;
      }
      return returnVal;
    },
  },
  methods: {
    saveLocation() {
      this.$emit('setData', {
        email: this.email,
        name: this.name,
        headCount: this.headCount,
        remark: this.request,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .requestWrap{
    padding: 22px 16px 129px 16px;
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
    .contentWrap{
      margin-top: 22px;
      .content{
        margin-top: 30px;
        &:first-of-type{
          margin-top: 0;
        }
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
        select{
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        input, textarea{
          margin-top: 10px;
        }
        select, input, textarea{
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
        textarea{
          height: 128px;
        }
        .err{
          color: #d0021b;
          font-size: 16px;
          margin-top: 10px;
          transition: .3s ease;
        }
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
        background-color: #e7b6a7;
        &.active{
          background-color: #ff4208;
        }
      }
    }
  }
</style>
