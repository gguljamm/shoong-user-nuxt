<template>
  <ul class="footer">
    <li
      :class="$route.path.indexOf('/store') < 0 && $route.path.indexOf('/profile') < 0 && $route.path.indexOf('/chat') < 0 ? 'selected' : ''"
      @click="$router.push('/')"
    >Explore</li>
    <li
      :class="$route.path.indexOf('/chat') >= 0 ? 'selected' : ''"
      @click="$router.push('/chat')"
    >Chat</li>
    <li
      :class="$route.path.indexOf('/store') >= 0 ? 'selected' : ''"
      @click="$router.push('/store')"
    >Store</li>
    <li
      :class="$route.path.indexOf('/profile') >= 0 ? 'selected' : ''"
      @click="$router.push('/profile')"
    >Profile</li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .footer{
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    height: calc(constant(safe-area-inset-bottom) + 44px);
    height: calc(env(safe-area-inset-bottom) + 44px);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    display: flex;
    box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
    background-color: #FFF;
    > li{
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      line-height: 44px;
      flex: 0 0 25%;
      &.selected{
        color: darkorange;
      }
    }
  }
  .hideNavi .footer{
    display: none;
  }
</style>
