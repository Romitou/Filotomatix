<template>
  <div>
    <InfoBar :info="null" />
    <v-container fluid>
      <v-card class="mb-3" style="background-color: #134483;">
        <v-img
          src="/banner.png"
          height="100"
        />
        <v-card-subtitle class="pa-2">
          <div class="subtitle-2 white--text">
            Cliquez ici pour découvrir les offres
          </div>
          <div style="color: #dee2e6">
            Votre Filotomatix sera valable jusqu'à la fermeture des files d'attente.
          </div>
        </v-card-subtitle>
      </v-card>
      <v-row dense>
        <v-col
          v-for="ride in rides"
          :key="ride._id"
          cols="6"
        >
          <v-card
            hover
            @click="showModal(ride)"
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
                  <div class="orange--text">
                    <v-icon small color="orange">
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
                    </v-icon> Accès immédiat !
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
    <v-dialog
      v-model="modal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          v-if="selectedRide"
          color="#134483"
        >
          <v-btn
            icon
            dark
            @click="hideModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">
            {{ selectedRide.name }}
          </v-toolbar-title>
        </v-toolbar>
        <InfoBar :info="null" />
        <RideModal v-if="selectedRide" :ride="selectedRide" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RideModal from '~/components/RideModal';
export default {
  components: { RideModal },
  data() {
    return {
      rides: [],
      error: null,
      interval: null,
      selectedRide: null,
      modal: false
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
      if (this.selectedRide)
        this.selectedRide = this.rides.find(ride => ride._id === this.selectedRide._id);
    },
    showModal(ride) {
      this.modal = true;
      this.selectedRide = ride;
    },
    hideModal() {
      this.modal = false;
    }
  }
};
</script>
