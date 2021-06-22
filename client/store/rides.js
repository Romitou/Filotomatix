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
  }
};

export const actions = {
  async fetchRides({ commit, state }, $axios) {
    const rides = await $axios.$get('/rides').catch(() => {});
    if (state.alphaSort) {
      rides.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    } else {
      rides.sort((a, b) => a.waitTimeMins - b.waitTimeMins);
    }
    commit('setRides', rides);
  }
};
