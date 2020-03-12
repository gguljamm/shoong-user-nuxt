<template>
  <div
    v-if="init"
    class="bookingControlWrap storeWrapper"
  >
    <component
      :is="componentInstance"
      :bookData="bookData"
      :isValidBtn="isValidBtn"
      @setData="receiveData"
      @changePage="changePage"
      @backStep="backStep"
      @booking="bookingSubmit"
      :key="steps"
      class="bookComponent"
    ></component>
  </div>
</template>

<script>
  import moment from 'moment';
  import Api from '~/utils/api';

  export default {
    data() {
      const bookData = {
        route: {
          direction: '',
          airport: '',
        },
        date: '',
        time: '',
        location: '',
        userInfo: {
          email: this.$store.state.user.email,
          name: this.$store.state.user && this.$store.state.user.name ? this.$store.state.user.name : '',
          headCount: '',
          remark: '',
        },
      };
      return {
        init: false,
        moment,
        Api,
        isValidBtn: true,
        windowWidth: 0,
        windowHeight: 0,
        stepsList: ['route', 'date', 'time', 'location', 'userInfo', 'checkData'],
        steps: 'route',
        bookData,
        success: false,
      };
    },
    computed: {
      componentInstance() {
        const step = this.steps;
        return () => import(`./${step}`);
      },
    },
    methods: {
      changePage(page) {
        this.steps = page;
      },
      backStep() {
        const previous = this.stepsList && this.stepsList[this.stepsList.indexOf(this.steps) - 1];
        if (previous) {
          this.steps = previous;
        } else {
          this.$emit('changePage', 'home');
        }
      },
      receiveData(data) {
        this.bookData[this.steps] = data;
        console.log(this.bookData);
        const next = this.stepsList && this.stepsList[this.stepsList.indexOf(this.steps) + 1];
        if (next) {
          this.steps = next;
        }
      },
      keyboardUp() {
        if (this.windowWidth === window.innerWidth && document.activeElement && document.activeElement.tagName === 'INPUT') {
          if (this.windowHeight > window.innerHeight) {
            this.isValidBtn = false;
            this.windowHeight = window.innerHeight;
          } else {
            this.isValidBtn = true;
            this.windowHeight = window.innerHeight;
          }
        } else {
          this.isValidBtn = true;
          this.windowHeight = window.innerHeight;
        }
      },
      bookingCancel() {
        if (window.confirm(`예약${this.$route.params.id ? ' 수정' : ''}을 취소하시겠습니까?`)) {
          this.$router.push(this.$i18n.path(''));
        }
      },
      bookingSubmit() {
        const submitData = {
          customerName: this.bookData.userInfo.name,
          headCount: this.bookData.userInfo.headCount,
          email: this.bookData.userInfo.email,
          departure: this.bookData.route.direction === 'TO' ? this.bookData.route.airport : this.bookData.location,
          arrival: this.bookData.route.direction === 'TO' ? this.bookData.location : this.bookData.route.airport,
          date: this.moment(this.bookData.date).format('YYYY.MM.DD'),
          time: this.bookData.time,
          remark: this.bookData.userInfo.remark,
          userId: this.$store.state.user.uid,
        };
        if (this.bookData.remark) {
          submitData.remark = this.bookData.remark;
        }
        if (window.confirm(this.$t('booking.confirm'))) {
          Api.booking(submitData).then(() => {
            this.success = true;
            this.$emit('success', submitData);
          }).catch((err) => {
            console.log(err);
          });
        }
      },
    },
    async mounted() {
      this.$nextTick(() => {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', this.keyboardUp);
        this.keyboardUp();
        this.init = true;
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.keyboardUp);
      // console.log(formData);
    },
  };
</script>

<style lang="scss" scoped>
  .bookComponent{
    user-select: none;
  }
  .bookingControlWrap{
    padding-top: 50px;
  }
</style>
