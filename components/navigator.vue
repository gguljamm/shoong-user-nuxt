<template>
  <ul class="footer">
    <li
      :class="$route.path.indexOf('/store') < 0 && $route.path.indexOf('/profile') < 0 && $route.path.indexOf('/chat') < 0 ? 'selected' : ''"
      @click="$router.push('/')"
    >home</li>
    <li
      :class="$route.path.indexOf('/chat') >= 0 ? 'selected' : ''"
      @click="$router.push('/chat')"
    >message</li>
    <li
      :class="$route.path.indexOf('/store') >= 0 ? 'selected' : ''"
      @click="$router.push('/store')"
    >shuttle</li>
    <li
      :class="$route.path.indexOf('/profile') >= 0 ? 'selected' : ''"
      @click="$router.push('/profile')"
    >profile</li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    height: calc(constant(safe-area-inset-bottom) + 44px);
    height: calc(env(safe-area-inset-bottom) + 44px);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    display: flex;
    box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
    background-color: #FFF;
    > li{
      background-position: center 8px;
      background-repeat: no-repeat;
      background-size: 20px;
      cursor: pointer;
      font-size: 10px;
      text-align: center;
      padding-top: 28px;
      line-height: 16px;
      flex: 0 0 25%;
      &.selected{
        color: rgb(255, 66, 8);
      }
      &:nth-of-type(1) {
        background-image: url(~assets/img/home_1.svg);
        &.selected{
          background-image: url(~assets/img/home_1_selected.svg);
        }
      }
      &:nth-of-type(2) {
        background-image: url(~assets/img/messageCircle_1.svg);
        &.selected{
          background-image: url(~assets/img/messageCircle_1_selected.svg);
        }
      }
      &:nth-of-type(3) {
        background-position: center 10px;
        background-image: url(~assets/img/bus_1.svg);
        &.selected{
          background-image: url(~assets/img/bus_1_selected.svg);
        }
      }
      &:nth-of-type(4) {
        background-image: url(~assets/img/user_1.svg);
        &.selected{
          background-image: url(~assets/img/user_1_selected.svg);
        }
      }
    }
  }
  .hideNavi .footer{
    display: none;
  }
</style>
