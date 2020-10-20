<template>
  <v-container
    fill-height
    fluid
    class="ma-0 pa-0"
  >
    <v-row
      align="start"
    >
      <v-col
        v-for="ride in rides"
        :key="ride._id"
      >
        <v-card
          hover
          height="250"
          min-width="130"
        >
          <v-img
            :src="ride.image"
            class="white--text align-end"
            aspect-ratio="4:3"
            height="150"
          />

          <v-card-subtitle class="text-truncate">
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
export default {
  middleware: 'auth',
  auth: false,
  data() {
    return {
      rides: []
    };
  },
  mounted() {
    this.refreshData();
    setInterval(this.refreshData, 10000);
  },
  methods: {
    refreshData() {
      this.$axios.get('/api/rides')
        .then(r => (this.rides = r.data));
    }
  }
};
</script>
