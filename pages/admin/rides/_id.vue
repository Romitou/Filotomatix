<template>
  <v-container fluid>
    <v-alert
      v-if="ride.error"
      class="mt-5 mb-0"
      border="left"
      color="red"
      dense
      outlined
      type="error"
    >
      {{ ride.error }}
    </v-alert>
    <div v-else>
      {{ ride.name }}
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth', 'admin'],
  auth: true,
  async asyncData({ route, $axios }) {
    const req = await $axios.get(`/api/rides/${route.params.id}`).catch(() => {});
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
