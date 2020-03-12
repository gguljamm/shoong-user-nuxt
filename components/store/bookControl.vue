<template>
  <div class="bookWrapper scrollable">
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
  };
</script>

<style lang="scss">
  .bookWrapper{
    .header{
      z-index: 2;
      background-color: #FFF;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      padding: 8px 0 0 4px;
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
  }
</style>
