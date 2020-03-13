<template>
  <div class="feedWrapper">
    <div class="fixTop">
      <div class="header">
        <button>검색</button>
        <button>추천</button>
        <button>최신</button>
        <button>필터</button>
      </div>
    </div>
    <div class="scrollable navi" ref="scrollable">
      <ul class="content">
        <li v-for="x in 10" :key="x" @click="$router.push({ path: `/${x}` })">
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
    <transition name="right-popup" mode="out-in">
      <feed-content v-if="$route.params.feedId"></feed-content>
      <feed-detail-content v-if="$route.params.feedDetailId"></feed-detail-content>
    </transition>
  </div>
</template>

<script>
import feedContent from './feedContent';
import feedDetailContent from './feedDetailContent';

export default {
  components: {
    feedContent,
    feedDetailContent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$bodyLock.lock();
  },
};
</script>

<style lang="scss" scoped>
  .feedWrapper{
    height: 100%;
    background-color: rgb(248, 249, 251);
    .fixTop{
      background-color: rgb(248, 249, 251);
      z-index: 5;
      .header{
        display: flex;
        height: 44px;
        > button{
          flex: 0 0 25%;
        }
      }
    }
    .scrollable > ul{
      padding: 70px 20px 20px;
      > li{
        cursor: pointer;
        margin-bottom: 20px;
        padding: 12px 12px 12px;
        width: 100%;
        height: 464px;
        border: 1px solid rgb(151,151,151);
        border-radius: 15px;
        position: relative;
        background-image: url(~assets/img/cafe.jpg);
        background-size: cover;
        background-position: center center;
        &:nth-child(even) {
          background-image: url(~assets/img/cafe2.jpg);
        }
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
