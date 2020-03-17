<template>
  <div class="feedWrapper">
    <div class="fixTop">
      <div class="header">
        <button class="search"></button>
        <button class="sort" :class="sort === 'recommend' ? 'active' : ''" @click="sort = 'recommend'"><span>추천</span></button>
        <button class="sort" :class="sort === 'newest' ? 'active' : ''" @click="sort = 'newest'"><span>최신</span></button>
        <button class="filter"></button>
      </div>
    </div>
    <div class="scrollable navi" ref="scrollable">
      <ul class="content">
        <li v-for="x in 10" :key="x" @click="$router.push({ path: `/${x}` })">
          <div>
            <div>
              <div>카페투어</div>
              <div>숨어있는<br>힙지로 갬성카페</div>
              <div>
                <span>#힙지로</span>
                <span>#뉴트로갬성</span>
                <span>#카페</span>
              </div>
            </div>
            <button class="bookMark"></button>
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
    return {
      sort: 'recommend',
    };
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
        height: 54px;
        padding-top: 10px;
        > button{
          &.search, &.filter{
            flex: 0 0 20%;
            background-repeat: no-repeat;
            background-size: 24px;
            background-position: center center;
          }
          &.sort{
            flex: 0 0 30%;
            color: #939499;
            transition: .2s ease;
            &.active{
              color: #000;
              > span{
                padding: 0 4px;
                border-bottom: 2px solid #000;
              }
            }
          }
          &.search{
            background-image: url(~assets/img/search.svg);
          }
          &.filter{
            background-image: url(~assets/img/filter.svg);
          }
        }
      }
    }
    .scrollable > ul{
      padding: 74px 20px 20px;
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
        color: #FFF;
        overflow: hidden;
        &:nth-child(even) {
          background-image: url(~assets/img/cafe2.jpg);
        }
        &:last-of-type{
          margin-bottom: 0;
        }
        > div{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,.33);
          > div:first-of-type{
            position: absolute;
            bottom: 40px;
            left: 25px;
            right: 25px;
            > div:first-of-type{
              display: inline-block;
              border-radius: 15px;
              height: 29px;
              line-height: 29px;
              padding: 0 12px;
              font-size: 14px;
              background-color: rgba(255, 255, 255, .23);
            }
            > div:nth-of-type(2){
              margin-top: 12px;
              font-size: 34px;
              line-height: 41px;
              margin-bottom: 12px;
            }
            > div:nth-of-type(3){
              font-size: 18px;
              line-height: 21px;
            }
          }
          .bookMark{
            width: 24px;
            height: 24px;
            position: absolute;
            top: 20px;
            right: 20px;
            background-repeat: no-repeat;
            background-size: 24px;
            background-position: center center;
            background-image: url(~assets/img/bookmark.svg);
          }
        }
      }
    }
  }
</style>
