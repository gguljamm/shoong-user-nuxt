<template>
  <div class="popup" @click="close()">
    <div @click.stop>
      <div>채팅방에서 사용할 이름을 설정해주세요.</div>
      <input v-model="name" :placeholder="userName">
      <button @click="submit()">설정</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userName'],
  data() {
    return {
      name: '',
      scrollPosition: '',
    };
  },
  methods: {
    submit() {
      if (!this.name || this.name.replace(/ /gi, '') >= 0) {
        alert('한글자이상 입력해주세요');
        return;
      }
      this.$emit('set-user-name', this.name);
    },
    close() {
      if (this.userName) {
        this.$emit('set-user-name', this.userName);
      }
    },
  },
  mounted() {
    this.scrollPosition = window.pageYOffset;
    window.document.body.style.overflow = 'hidden';
    window.document.body.style.position = 'fixed';
    window.document.body.style.top = `-${this.scrollPosition}px`;
    window.document.body.style.width = '100%';
  },
  beforeDestroy() {
    window.document.body.style.removeProperty('overflow');
    window.document.body.style.removeProperty('position');
    window.document.body.style.removeProperty('top');
    window.document.body.style.removeProperty('width');
    window.scrollTo(0, this.scrollPosition);
  }
};
</script>

<style lang="scss" scoped>
  .popup{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 10;
    > div{
      background-color: #FFF;
      padding: 20px 20px 66px;
      position: absolute;
      width: 300px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      > div{
        line-height: 20px;
        font-size: 14px;
      }
      > input{
        margin-top: 12px;
        width: 100%;
        height: 40px;
        padding: 0 8px;
        border: 1px solid #eee;
      }
      > button{
        box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
      }
    }
  }
</style>
