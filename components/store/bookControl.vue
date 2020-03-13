<template>
  <div class="bookWrapper scrollable navi">
    <div v-if="!messagePopFlag">
      <book
        @changePage="changePage"
        @success="openMessage"
      ></book>
    </div>
    <messagePop
      v-if="messagePopFlag"
      :bookData="bookData"
    ></messagePop>
  </div>
</template>

<script>
  import book from '~/components/store/bookWrap.vue';
  import messagePop from '~/components/store/message.vue';

  export default {
    components: {
      book,
      messagePop,
    },
    data() {
      return {
        messagePopFlag: false,
        bookData: {
          // customerName: '문성주',
          // headCount: '3',
          // email: 'ex@ex.com',
          // departure: 'Dulos hotel',
          // arrival: 'Incheon int’l Airport Terminal 1',
          // date: '2020.02.02',
          // time: '12:00',
          // remark: '특이사항',
          customerName: '',
          headCount: '',
          email: '',
          departure: '',
          arrival: '',
          date: '',
          time: '',
          remark: '',
        },
      };
    },
    methods: {
      openMessage(bookData) {
        window.scrollTo(0, 0);
        this.bookData = bookData;
        this.messagePopFlag = true;
      },
      changePage(page) {
        this.$emit('changePage', page);
      },
    },
    mounted() {
      this.$bodyLock.lock();
    },
  };
</script>

<style lang="scss">
  .bookWrapper{
    .header{
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      padding: 8px 0 0 4px;
      background-color: #fff;
      > button{
        bottom: 0;
        width: 44px;
        height: 44px;
        background-repeat: no-repeat;
        background-position: center center;
        &:nth-of-type(1){
          background-image: url(~assets/img/chevron-left.svg);
        }
      }
    }
    .pageBottomBtnWrap{
      width: 100%;
      height: 95px;
      padding: 22px 21px;
      margin-bottom: 44px;
      button{
        transition: .3s ease;
        width: 100%;
        height: 55px;
        border-radius: 6px;
        font-weight: bold;
        background-color: #e7b6a7;
        color: #fff;
        &.active{
          background-color: #ff4208;
        }
      }
    }
  }
</style>
