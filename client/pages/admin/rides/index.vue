<template>
  <div>
    <v-container>
      <v-simple-table>
        <thead>
          <tr>
            <th>
              Nom de l'attraction
            </th>
            <th>
              Temps d'attente
            </th>
            <th>
              File d'attente
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ride in rides"
            :key="ride._id"
          >
            <td class="blue-grey--text">
              <v-icon v-if="ride.status === 'closed'" color="red" small>
                mdi-cancel
              </v-icon>
              <v-icon v-else-if="ride.status === 'full'" color="orange" small>
                mdi-account-cancel
              </v-icon>
              <v-icon v-else color="green" small>
                mdi-check-circle-outline
              </v-icon>
              {{ ride.name }}
            </td>
            <td>{{ ride.waitTimeMins }}</td>
            <td> {{ ride.queueLength }}</td>
            <td>
              <v-btn
                color="grey"
                icon
                @click="showModal(ride)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
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
            dark
            icon
            @click="hideModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">
            {{ selectedRide.name }}
          </v-toolbar-title>
        </v-toolbar>
        <RideAdminModal v-if="selectedRide" :ride="selectedRide" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RideAdminModal from '~/components/RideAdminModal';
export default {
  components: { RideAdminModal },
  layout: 'admin',
  data() {
    return {
      rides: [],
      error: null,
      interval: null,
      selectedRide: null,
      modal: false,
      button: null
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
      this.rides = await this.$axios.$get('/rides/admin').catch(() => {});
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
