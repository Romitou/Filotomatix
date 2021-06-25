<template>
  <div>
    <InfoBar :info="null" />
    <v-container fluid>
      <v-card
        nuxt
        to="/offers"
        class="mb-4"
        color="primary"
      >
        <v-img
          height="100"
          src="/banner.png"
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
          cols="6"
        >
          <v-btn
            block
            color="#415A77"
            class="white--text"
            :depressed="isAlphaSort"
            @click="setSort(true)"
          >
            <v-icon left>
              mdi-sort-alphabetical-variant
            </v-icon>
            A-Z
          </v-btn>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            block
            color="#415A77"
            class="white--text"
            :depressed="!isAlphaSort"
            @click="setSort(false)"
          >
            <v-icon left>
              mdi-sort-clock-ascending-outline
            </v-icon>
            Attente
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="ride in rides"
          :key="ride._id"
          cols="6"
        >
          <v-card
            hover
            @click="showModal(ride._id)"
          >
            <v-img
              :src="ride.image"
              aspect-ratio="4:3"
              height="100"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey"
                  />
                </v-row>
              </template>
            </v-img>

            <v-card-subtitle class="pa-2">
              <div class="blue-grey--text subtitle-2">
                {{ ride.name }}
              </div>
              <div style="font-size: 12px;">
                <div v-if="ride.status === 'closed'">
                  <div class="red--text">
                    <v-icon color="red" small>
                      mdi-cancel
                    </v-icon>
                    Fermé
                  </div>
                  <div>
                    <v-icon small>
                      mdi-clock-alert-outline
                    </v-icon>
                    Réserver ultérieurement
                  </div>
                </div>
                <div v-else-if="ride.status === 'full'">
                  <div class="orange--text">
                    <v-icon color="orange" small>
                      mdi-account-cancel
                    </v-icon>
                    Complet
                  </div>
                  <div>
                    <v-icon small>
                      mdi-clock-alert-outline
                    </v-icon>
                    Réserver ultérieurement
                  </div>
                </div>
                <div v-else>
                  <div class="green--text">
                    <v-icon color="green" small>
                      mdi-check-circle-outline
                    </v-icon>
                    Ouvert
                  </div>
                  <div v-if="ride.waitTimeMins < 1">
                    <v-icon small>
                      mdi-clock-fast
                    </v-icon>
                    Accès immédiat !
                  </div>
                  <div v-else>
                    <v-icon small>
                      mdi-clock-outline
                    </v-icon>
                    {{ ride.waitTimeMins }} minute{{ ride.waitTimeMins > 1 ? 's' : '' }}
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
          color="primary"
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
      error: null,
      interval: null,
      selectedId: null,
      modal: false
    };
  },
  computed: {
    rides() {
      return this.$store.state.rides.list;
    },
    selectedRide() {
      return this.$store.state.rides.list.find(ride => ride._id === this.selectedId);
    },
    isAlphaSort() {
      return this.$store.state.rides.alphaSort;
    }
  },
  methods: {
    showModal(id) {
      this.modal = true;
      this.selectedId = id;
    },
    hideModal() {
      this.modal = false;
    },
    setSort(alphaSort) {
      this.$store.commit('rides/setAlphaSort', alphaSort);
      this.$store.commit('rides/sortRides');
    }
  }
};
</script>
