<template>
  <v-container>
    {{ ride.name }}
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ route, $axios }) {
    const req = await $axios.get(`/api/rides/${route.params.id}`);
    return { ride: req.data };
  },
  data() {
    return {
      ride: undefined,
      error: false
    };
  }
};
</script>
