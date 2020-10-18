<template>
  <v-container fluid>
    <v-row >
      <v-card
        hover
        width="300"
        height="300"
        v-for="ride in rides"
        :key="ride.name"
        class="ma-2"
      >
        <v-img
          :src="ride.image"
          class="white--text align-end"
          height="200px"
        >
          <v-card-title v-text="ride.name"></v-card-title>
        </v-img>

        <v-card-text class="text--secondary">
          <div>
            <a class="text-decoration-none">
              {{ ride.name }}
            </a>

            <div v-if="ride.status === 'closed'">
              <div class="red--text mb-2">Fermé</div>
              <div>
                <v-icon small>mdi-clock-alert-outline</v-icon> Réserver ultérieurement
              </div>
            </div>
            <div v-else-if="ride.status === 'full'">
              <div class="red--text mb-2">Complet</div>
              <div>
                <v-icon small>mdi-clock-alert-outline</v-icon> Réserver ultérieurement
              </div>
            </div>
            <div v-else>
              <div class="mb-2">Ouvert</div>
              <div v-if="ride.waitTimeMins < 1">
                <v-icon small>mdi-clock-fast</v-icon> Accédez à l'attraction maintenant !
              </div>
              <div v-else>
                <v-icon small>mdi-clock-outline</v-icon> {{ ride.waitTimeMins }} minutes
              </div>
            </div>

          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rides: null
    }
  },
  mounted() {
    this.$axios
      .get('http://127.0.0.1:3000/api/rides')
      .then(response => (this.rides = response.data));
  }
}
</script>
