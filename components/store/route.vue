<template>
  <div class="routeWrap">
    <div class="fixTop">
      <div class="header">
        <button @click="$emit('backStep')"></button>
      </div>
    </div>
    <div class="routeBodyWrap">
      <div class="serviceTitle">
        <div class="intro">
          {{ $t('booking.route.title') }}
        </div>
      </div>
      <div class="contentWrap">
        <div class="content">
          <div class="title">{{ $t('booking.route.serviceInputTitle') }}</div>
          <div class="selectWrap">
            <select v-model="route">
              <option value="TO">{{ $t('booking.route.to') }}</option>
              <option value="FROM">{{ $t('booking.route.from') }}</option>
            </select>
            <div class="selectIcon"></div>
          </div>
        </div>
        <div class="content">
          <div class="title">{{ $t('booking.route.airportInputTitle') }}</div>
          <div class="selectWrap">
            <select
              v-model="airport"
            >
              <option :value="$t('booking.route.ICN1')">{{$t('booking.route.ICN1')}}</option>
              <option :value="$t('booking.route.ICN2')">{{$t('booking.route.ICN2')}}</option>
              <option :value="$t('booking.route.GMP')">{{$t('booking.route.GMP')}}</option>
            </select>
            <div class="selectIcon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixBottom">
      <div class="pageBottomBtnWrap">
        <button @click="submit" class="active">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookData'],
  data() {
    const route = this.bookData && this.bookData.route.direction ? this.bookData.route.direction : 'TO';
    const airport = this.bookData && this.bookData.route.airport ? this.bookData.route.airport : this.$t('booking.route.ICN1');
    return {
      route,
      airport,
    };
  },
  methods: {
    submit() {
      this.$emit('setData', { direction: this.route, airport: this.airport });
    },
  },
};
</script>

<style lang="scss" scoped>
  .routeWrap {

    a {
      display: block;
      text-decoration: none;
      color: inherit;
    }
    .routeBodyWrap{
      padding: 22px 16px 120px 16px;
      .serviceTitle {
        display: flex;

        .intro {
          flex: auto;
          font-size: 30px;
          font-weight: bold;
          line-height: 39px;
          color: #000;
        }
      }
      .contentWrap{
        margin-top: 50px;
        .content{
          margin-top: 30px;
          &:first-of-type{
            margin-top: 0;
          }
          .title{
            font-size: 15px;
            color: #000;
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
            width:100%;
            background-color: #fff;
            /* Prefixed box-sizing rules necessary for older browsers */
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            /* Remove select styling */
            appearance: none;
            -webkit-appearance: none;
            /* Magic font size number to prevent iOS text zoom */
            border-radius: 4px;
            border: solid 1px #ebecf1;
            font-size: 20px;
            color: #000;
            padding: 20px;
          }
        }
      }
    }
  }
</style>
