<template>
  <v-container
    fluid
  >
    <v-row
      align="start"
    >
      <v-col
        v-for="ride in rides"
        :key="ride.name"
      >
        <v-card
          hover
        >
          <v-img
            :src="ride.image"
            class="white--text align-end"
          >
            <v-card-title v-text="ride.name" />
          </v-img>

          <v-card-text class="text--secondary">
            <div>
              <div v-if="ride.status === 'closed'">
                <div class="red--text mb-2">
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
                <div class="red--text mb-2">
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
                <div class="green--text mb-2">
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
                  </v-icon> {{ ride.waitTimeMins }} minutes
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { config } from '@/app.config';

export default {
  data() {
    return {
      rides: null
    };
  },
  mounted() {
    this.$axios
      .get(`${config.apiUrl}/api/rides`)
      .then(response => (this.rides = response.data));
  }
};
</script>
