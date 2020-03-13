<template>
  <div class="dateWrap scrollable">
    <div class="fixTop">
      <div class="header">
        <button @click="$emit('backStep')"></button>
      </div>
    </div>
    <div class="title">
      <div class="intro" v-html="$t('booking.date.title')"></div>
    </div>
    <div class="calendar">
      <div class="dayOfWeek">
        <ul>
          <li v-for="day in weeks" :key="day">
            {{day}}
          </li>
        </ul>
      </div>
      <div class="calBody">
        <div
          v-for="(calInfo, index) in calendarInfo"
          :key="index"
          class="calWrap"
        >
          <div class="calTitle">{{calInfo.date.replace('-', '.')}}</div>
          <div class="calContent">
            <div
              v-for="(week, index2) in calInfo.week"
              :key="index2"
              class="week"
            >
              <a href="javascript:"
                v-for="(cal, index3) in week"
                :key="index3"
                class="cal"
                 @click="cal && chkDate(`${calInfo.date}-${format.zeros(cal)}`) ? selectDate = `${calInfo.date}-${format.zeros(cal)}` : ''"
                :class="[cal && chkDate(`${calInfo.date}-${format.zeros(cal)}`) ? '' : 'disable']"
              >
                <div class="calVal" :class="selectDate === `${calInfo.date}-${format.zeros(cal)}` ? 'active' : ''">
                  <span v-if="cal !== 0">{{cal}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixBottom">
      <div class="pageBottomBtnWrap">
        <button @click="selectDate ? submit() : ''" :class="selectDate ? 'active' : ''">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import format from '~/utils/format';

export default {
  props: ['bookData'],
  data() {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${format.zeros(today.getMonth() + 1)}-${format.zeros(today.getDate())}`;
    const todayMonth = (today.getMonth() + 1);
    const dateArr = [];
    for (let x = 0; x < 12; x += 1) {
      const nextMonth = todayMonth + x;
      dateArr.push(nextMonth > 12 ? `${today.getFullYear() + 1}-${format.zeros(nextMonth - 12)}` : `${today.getFullYear()}-${format.zeros(nextMonth)}`);
    }
    const selectDate = this.bookData && this.bookData.date;
    return {
      moment,
      format,
      dateArr,
      weeks: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      calendarInfo: [],
      todayString,
      selectDate,
    };
  },
  methods: {
    chkDate(date) {
      let flag = true;
      if (new Date(date) < new Date(`${new Date().toDateString()}`)) {
        flag = false;
      }
      return flag;
    },
    submit() {
      this.$emit('setData', this.selectDate);
    },
  },
  mounted() {
    const today = new Date();
    for (let x = 1; x <= 12; x += 1) {
      const thisToday = new Date(this.todayString);
      thisToday.setMonth(today.getMonth() + x);
      thisToday.setDate(0);
      const key = this.dateArr[x - 1];
      const lastDay = thisToday.getDate();
      thisToday.setDate(1);
      const firstDay = thisToday.getDay();
      const arrDate = [];
      for (let y = 0; y < firstDay; y += 1) {
        arrDate.push(0);
      }
      for (let y = 1; y <= lastDay; y += 1) {
        arrDate.push(y);
      }
      const arrWeek = [];
      let k = 0;
      for (let y = 0; y < arrDate.length; y += 1) {
        if (!Array.isArray(arrWeek[k])) {
          arrWeek[k] = [];
        }
        arrWeek[k].push(arrDate[y]);
        if (arrWeek[k].length >= 7) {
          k += 1;
        }
      }
      this.calendarInfo.push({ date: key, week: arrWeek });
    }
  },
};
</script>

<style lang="scss" scoped>
  .dateWrap {
    padding: 22px 16px 140px 16px;
    a{
      display: block;
      text-decoration: none;
      color: inherit;
    }
    .title{
      display: flex;
      .intro{
        flex: auto;
        font-size: 30px;
        font-weight: bold;
        line-height: 39px;
        color: #000;
      }
    }
    .calendar {
      margin-top: 30px;
      .dayOfWeek {
        width: 100%;
        ul {
          list-style: none;
          width: 100%;
          display: flex;
          li {
            color: #939499;
            font-size: 16px;
            text-align: center;
            flex: 1 1 14.285714285714285%;
          }
        }
      }
      .calBody{
        padding: 0 9px;
        .calWrap{
          margin-top: 30px;
          .calTitle{
            font-size: 20px;
            font-weight: bold;
            color: #000;
          }
          .calContent{
            margin-top: 25px;
            .week{
              margin-top: 20px;
              display: flex;
              &:first-of-type{
                margin-top: 0;
              }
              .cal{
                font-size: 16px;
                width: calc(100% / 7);
                line-height: 38px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                .calVal{
                  &.active{
                    color: #fff;
                    width: 38px;
                    height: 38px;
                    font-weight: bold;
                    display: block;
                    border-radius: 50px;
                    background-color: #ff4208;
                  }
                }
                &.disable{
                  opacity: .3;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
