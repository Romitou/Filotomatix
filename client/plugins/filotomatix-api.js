export default async ({ app: { $axios, store } }) => {
  await store.dispatch('rides/fetchRides', $axios);
  setInterval(() => store.dispatch('rides/fetchRides', $axios), 10000);
};
