<template>
  <div class="scrollable navi feedWrapper">
    <div class="header"></div>
    <ul class="">
      <li v-for="x in 10" :key="x">
        <div>카페투어</div>
        <div>
          <div>숨어있는<br>힙지로 갬성카페</div>
          <div>
            <span>#힙지로</span>
            <span>#뉴트로갬성</span>
            <span>#카페</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
  .feedWrapper{
    background-color: rgb(248, 249, 251);
    .header{
      position: absolute;
      top: 0;
      height: 44px;
      left: 0;
      width: 100%;
      background-color: rgb(248, 249, 251);
      z-index: 5;
    }
    > ul{
      padding: 70px 20px 20px;
      > li{
        cursor: pointer;
        margin-bottom: 20px;
        padding: 12px 12px 12px;
        width: 100%;
        height: 464px;
        border: 1px solid rgb(151,151,151);
        border-radius: 15px;
        background-color: rgb(216,216,216);
        position: relative;
        &:last-of-type{
          margin-bottom: 0;
        }
        > div:first-of-type{
          position: absolute;
          bottom: 171px;
          left: 20px;
          border: 1px solid rgb(151,151,151);
          border-radius: 15px;
          height: 30px;
          line-height: 28px;
          padding: 0 12px;
          font-size: 14px;
          color: rgb(147,148,153);
        }
      }
    }
  }
</style>
