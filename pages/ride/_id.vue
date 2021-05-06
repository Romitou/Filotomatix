<template>
  <v-container
    fill-height
    fluid
    class="ma-0 pa-0"
  >
    <v-alert
      v-if="ride.error"
      class="mt-5 mb-0"
      border="left"
      color="red"
      dense
      type="error"
    >
      Une erreur est survenue lors du chargement de cette attraction.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ route, $axios }) {
    const req = await $axios.get(`/api/rides/${route.params.id}`).catch(() => {});
    return { ride: req?.data || { error: 'Aucune attraction n\'a été trouvée.' } };
  },
  data() {
    return {
      ride: undefined,
      socket: undefined
    };
  },
  created() {
  }
};
</script>

<style scoped>

</style>
