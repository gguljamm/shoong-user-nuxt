<template>
  <div class="timePicker" @click.stop>
    <div
      class="timeList"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <ul
        :style="{ transform: `translateY(${timeListY}px)`, transition: trimTransition }"
      >
        <li
          v-for="(val, index) in timeList"
          :key="index"
        >
          <div>{{val.split(':')[0]}}</div>
          <div>:</div>
          <div>{{val.split(':')[1]}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['selectedTime'],
  data() {
    const timeList = [];
    for (let x = 10; x < 20; x += 1) {
      const hh = x < 10 ? `0${x}` : x;
      for (let y = 0; y < 4; y += 1) {
        const mm = y * 15 < 10 ? `0${y * 15}` : y * 15;
        timeList.push(`${hh}:${mm}`);
      }
    }
    const selectTime = this.selectedTime ? this.selectedTime : timeList[0];
    const timeListY = selectTime ? (timeList.indexOf(selectTime) * 70) * -1 : 0;
    const touchStartY = timeListY;
    return {
      moment,
      timeList,
      timeListY,
      touchStartPoint: 0,
      touchStartY,
      trimTransition: '',
      selectTime,
    };
  },
  methods: {
    touchstart(e) {
      this.touchStartPoint = e.changedTouches[0].pageY;
      this.touchStartY = this.timeListY;
    },
    touchmove(e) {
      e.preventDefault();
      const y = e.changedTouches[0].pageY;
      const data = (this.touchStartY + (y - this.touchStartPoint));
      this.timeListY = data;
    },
    touchend() {
      if (this.timeListY > 0) {
        this.timeListY = 0;
      } else if (this.timeListY < -2730) {
        this.timeListY = -2730;
      }
      const temp = ((this.timeListY === 0 ? 0 : (this.timeListY * -1)) / 70);
      const index = parseInt(temp, 10);
      const acc = parseInt((temp % 1) * 10, 10);
      let y = (acc <= 5 ? index : (index + 1)) * -70;
      if (y < -6650) {
        y = -6650;
      }
      this.trimTransition = '.3s';
      this.timeListY = y;
      setTimeout(() => {
        this.trimTransition = '';
      }, 300);
      this.touchStartPoint = 0;
      this.selectTime = this.timeList[acc <= 5 ? index : index + 1];
      this.$emit('changeData', this.selectTime);
    },
  },
  mounted() {
    this.$emit('changeData', this.selectTime);
  },
};
</script>

<style lang="scss" scoped>
  .timePicker {
    user-select: none;
    margin-top: 20px;
    .timeList {
      height: 194px;
      overflow: hidden;
      margin: 0 24px 0 24px;
      border-top: 1px solid #ebecf1;
      border-bottom: 1px solid #ebecf1;
      position: relative;
      display: flex;
      justify-content: center;

      &::after {
        top: 0;
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, .6) 20%, rgba(255, 255, 255, .9) 50%, #ffffff);
      }

      &::before {
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, .6) 20%, rgba(255, 255, 255, .9) 50%, #ffffff);
      }

      &::after, &::before {
        content: '';
        height: 54px;
        left: 0;
        right: 0;
        z-index: 1;
        position: absolute;
      }

      ul {
        padding-top: 62px;
        transform: translateY(0);

        li {
          font-size: 50px;
          font-weight: 500;
          color: #000;
          height: 70px;
          line-height: 70px;
          display: flex;
          > div{
            flex: auto;
            text-align: center;
            &:first-child, &:nth-of-type(3){
              width: 70px;
            }
            &:nth-of-type(2){
              width: 40px;
            }
          }
        }
      }
    }
  }
</style>
