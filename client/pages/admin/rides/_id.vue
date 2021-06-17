<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  auth: true,
  async asyncData({ route, $axios }) {
    const req = await $axios.get(`/rides/${route.params.id}`).catch(() => {});
    return { ride: req?.data || { error: 'Cette attraction n\'est pas enregistrée dans la base de donnée.' } };
  },
  data() {
    return {
      ride: undefined,
      error: false
    };
  }
};
</script>
