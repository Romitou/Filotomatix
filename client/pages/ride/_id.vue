<template>
  <div v-if="ride">
    <v-img
      :src="ride.image"
      height="200"
    />
    <v-container>
      <div class="blue-grey--text text-h6">
        {{ ride.name }}
      </div>
      <div>
        <div v-if="ride.status === 'closed'">
          <div class="red--text">
            <v-icon small color="red">
              mdi-cancel
            </v-icon> Fermé
          </div>
        </div>
        <div v-else-if="ride.status === 'full'">
          <div class="red--text">
            <v-icon small color="red">
              mdi-account-cancel
            </v-icon> Complet
          </div>
        </div>
        <div v-else>
          <div class="green--text">
            <v-icon small color="green">
              mdi-check-circle-outline
            </v-icon> Ouvert
          </div>
        </div>
      </div>
      <v-divider class="mt-4 mb-4" />
      <v-btn block class="white--text" color="#134483">
        <v-icon
          left
        >
          mdi-location-enter
        </v-icon>
        Accéder à cette file d'attente
      </v-btn>
      <p class="mt-1 blue-grey--text subtitle-2" style="text-align: center;">
        Temps d'attente estimé à {{ ride.waitTimeMins }} minutes
      </p>
      <v-divider class="mt-4 mb-4" />
      {{ ride.description }}
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'rideView',
  data() {
    return {
      ride: undefined,
      error: undefined,
      interval: undefined
    };
  },
  created() {
    this.fetchRide();
    this.interval = setInterval(this.fetchRide, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchRide() {
      this.ride = await this.$axios.$get(`/rides/${this.$route.params.id}`).catch(() => {});
    }
  }
};
</script>

<style scoped>

</style>
