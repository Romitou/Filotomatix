export const state = () => ({
  list: [],
  alphaSort: false
});

export const mutations = {
  setRides(state, list) {
    state.list = list;
  },
  setAlphaSort(state, value) {
    state.alphaSort = value;
  },
  sortRides(state) {
    if (state.alphaSort) {
      state.list.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    } else {
      state.list.sort((a, b) => a.waitTimeMins - b.waitTimeMins);
    }
  }
};

export const actions = {
  async fetchRides({ commit }, $axios) {
    const rides = await $axios.$get('/rides').catch(() => {});
    commit('setRides', rides);
    commit('sortRides');
  }
};
