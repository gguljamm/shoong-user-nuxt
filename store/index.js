export const state = () => ({
  userId: '',
});

export const mutations = {
  setUserId(store, id) {
    store.userId = id;
  },
};
