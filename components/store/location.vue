<template>
  <div class="locationWrap">
    <div class="fixTop">
      <div class="header">
        <button @click="$emit('backStep')"></button>
      </div>
    </div>
    <div class="serviceTitle">
      <div class="intro">
        {{ $t('booking.location.title') }}
      </div>
      <div class="sub" v-html="$t('booking.location.subTitle')"></div>
    </div>
    <div class="contentWrap">
      <div class="content">
        <input type="text" v-bind:value="location" v-on:input="location = $event.target.value" class="locationInput" :placeholder="$t('booking.location.inputPlaceholder')">
      </div>
    </div>
    <div class="fixBottom">
      <div v-if="isValidBtn" class="pageBottomBtnWrap">
        <button @click="location ? saveLocation() : ''" :class="location ? 'active' : ''">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookData', 'isValidBtn'],
  data() {
    const location = this.bookData && this.bookData.location;
    return {
      location,
    };
  },
  methods: {
    saveLocation() {
      this.$emit('setData', this.location);
    },
  },
};
</script>

<style lang="scss" scoped>
  .locationWrap{
    padding: 22px 16px 120px 16px;
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
        &:first-of-type{
          margin-top: 0;
        }
        input{
          width:100%;
          height: 64px;
          margin-top: 10px;
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
</style>
