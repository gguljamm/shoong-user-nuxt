import Vue from 'vue';

const bodyScrollLock = require('body-scroll-lock');

const action = {
  install: function () {
    Vue.prototype.$bodyLock = this;
  },
  lock: function () {
    const arr = document.getElementsByClassName('scrollable');
    for (let x = 0; x < arr.length; x += 1) {
      if (!arr[x].classList.contains('block')) {
        bodyScrollLock.disableBodyScroll(arr[x]);
        arr[x].classList.add('block');
      }
    }
  }
};

Vue.use(action);
