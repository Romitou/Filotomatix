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
import io from 'socket.io-client';

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
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('Socket connected to server.');
    });
    this.socket.on('ride-update', (data) => {
      if (data._id === this.ride?._id)
        Object.assign(this.ride, data);
    });
  }
};
</script>

<style scoped>

</style>
