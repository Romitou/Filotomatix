<template>
  <v-container
    fill-height
    fluid
    class="ma-0 pa-0"
  >
    <v-alert
      v-if="rides.error"
      class="mt-5 mb-0"
      border="left"
      color="red"
      dense
      type="error"
    >
      Une erreur est survenue lors du chargement des données des attractions.
    </v-alert>
    <v-row
      align="start"
      class="mt-5"
    >
      <v-col
        v-for="ride in rides"
        :key="ride._id"
      >
        <v-card
          hover
          height="250"
          min-width="250"
          link
          nuxt
          :to="`/ride/${ride._id}`"
        >
          <v-img
            :src="ride.image"
            class="white--text align-end"
            aspect-ratio="4:3"
            height="150"
          />

          <v-card-subtitle>
            <div class="blue-grey--text subtitle-2">
              {{ ride.name }}
            </div>
            <div>
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
</template>

<script>
import io from 'socket.io-client';

export default {
  async asyncData ({ $axios }) {
    const req = await $axios.get('/api/rides').catch(() => {});
    return { rides: req?.data || { error: 'Aucune attraction n\'a été trouvée.' } };
  },
  data() {
    return {
      rides: [],
      error: undefined,
      interval: undefined,
      socket: undefined
    };
  },
  created() {
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('Socket connected to server.');
    });
    this.socket.on('ride-update', (data) => {
      const item = this.rides.find(ride => ride._id === data._id);
      Object.assign(item, data);
    });
  }
};
</script>
