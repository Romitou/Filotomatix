<template>
  <div>
    <div class="pa-3" style="background-color: #e9ecef;">
      Filotomatix est fermé.
    </div>
    <v-container
      fluid
    >
      <v-card class="mb-3">
        <v-img
          src="/banner.png"
          height="100"
        />
        <v-card-subtitle style="background-color: #134483; color: white;" class="pa-2">
          <div class="subtitle-2">
            Cliquez ici pour découvrir les offres
          </div>
          <div style="color: #dee2e6">
            Votre Filotomatix sera valable jusqu'à la fermeture des files d'attente.
          </div>
        </v-card-subtitle>
      </v-card>
      <v-row

        dense
        align="start"
      >
        <v-col
          v-for="ride in rides"
          :key="ride._id"
          cols="6"
        >
          <v-card
            hover
            link
            nuxt
            :to="`/ride/${ride._id}`"
          >
            <v-img
              :src="ride.image"
              class="white--text align-end"
              aspect-ratio="4:3"
              height="100"
            />

            <v-card-subtitle class="pa-2">
              <div class="blue-grey--text subtitle-2">
                {{ ride.name }}
              </div>
              <div style="font-size: 12px;">
                <div v-if="ride.status === 'closed'">
                  <div class="red--text">
                    <v-icon small color="red">
                      mdi-cancel
                    </v-icon> Fermé
                  </div>
                  <div>
                    <v-icon small>
                      mdi-clock-alert-outline
                    </v-icon> Réserver ultérieurement
                  </div>
                </div>
                <div v-else-if="ride.status === 'full'">
                  <div class="red--text">
                    <v-icon small color="red">
                      mdi-account-cancel
                    </v-icon> Complet
                  </div>
                  <div>
                    <v-icon small>
                      mdi-clock-alert-outline
                    </v-icon> Réserver ultérieurement
                  </div>
                </div>
                <div v-else>
                  <div class="green--text">
                    <v-icon small color="green">
                      mdi-check-circle-outline
                    </v-icon> Ouvert
                  </div>
                  <div v-if="ride.waitTimeMins < 1">
                    <v-icon small>
                      mdi-clock-fast
                    </v-icon> Accédez à l'attraction maintenant !
                  </div>
                  <div v-else>
                    <v-icon small>
                      mdi-clock-outline
                    </v-icon> {{ ride.waitTimeMins }} minute{{ ride.waitTimeMins > 1 ? 's' : '' }}
                  </div>
                </div>
              </div>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rides: [],
      error: undefined,
      interval: undefined
    };
  },
  mounted() {
    this.fetchRides();
    this.interval = setInterval(this.fetchRides, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchRides() {
      this.rides = await this.$axios.$get('/rides').catch(() => {});
    }
  }
};
</script>
