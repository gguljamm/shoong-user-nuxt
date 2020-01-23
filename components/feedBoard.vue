<template>
  <div>
    <ul class="feedWrapper">
      <li v-for="x in 5" :key="x">
        <div class="info">
          <div>text<br>text<br>text<br>text</div>
          <div class="img"></div>
        </div>
        <div class="hashtag"><span>#hashtag</span><span>#hashtag</span><span>#hashtag</span></div>
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
    padding: 20px;
    > li{
      cursor: pointer;
      margin-bottom: 10px;
      padding: 12px 12px 12px;
      width: 100%;
      border: 1px solid #eee;
      border-radius: 20px;
      &:last-of-type{
        margin-bottom: 0;
      }
      > .info{
        display: flex;
        position: relative;
        > div{
          flex: auto;
        }
        > .img{
          flex: 0 0 100px;
          background-color: #EEE;
          height: 100px;
        }
      }
      > .hashtag{
        font-size: 12px;
        margin-top: 10px;
        > span{
          display: inline-block;
          background-color: #eee;
          border-radius: 10px;
          padding: 4px 8px;
          margin-right: 8px;
        }
      }
    }
  }
</style>
