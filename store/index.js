import Vue from 'vue';
const script = {
  en: require('~/locales/en'),
  cn: require('~/locales/cn'),
  jp: require('~/locales/jp'),
};

export const state = () => ({
  user: {},
  locales: ['en', 'jp', 'cn'],
  locale: 'en',
  isAnswer: false,
});

export const mutations = {
  setUserId(state, user) {
    state.user = user;
  },
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
      Vue.prototype.$t = (path) => {
        try {
          let t = script[locale];
          const p = path.split('.');
          for (let x = 0; x < p.length; x += 1) {
            t = t[p[x]]
          }
          return t;
        } catch {
          return 'error';
        }
      }
    }
  },
  changeAnswerState (state, value) {
    state.isAnswer = value;
  },
};
