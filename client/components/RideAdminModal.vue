<template>
  <div v-if="dataRide">
    <v-img
      :src="dataRide.image"
      height="200"
    />
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="dataRide.name"
            label="Nom de l'attraction"
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="dataRide.status"
            :items="[
              { name: 'Ouvert', id: 'open' },
              { name: 'Complet', id: 'full' },
              { name: 'Fermé', id: 'closed' }
            ]"
            item-text="name"
            item-value="id"
            label="Statut de l'attraction"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="dataRide.image"
        label="URL de l'aperçu attraction"
      />
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="dataRide.throughput"
            label="Débit de l'attraction"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="dataRide.maxReservations"
            label="Réservations maximales"
          />
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-textarea
        v-model="dataRide.description"
        label="Description de l'attraction"
        rows="1"
        prepend-icon="mdi-card-text"
      />
      <v-textarea
        v-model="dataRide.position"
        label="Position de l'attraction"
        rows="1"
        prepend-icon="mdi-map-marker"
      />
      <div class="my-3 subtitle-2">
        <v-icon>
          mdi-alert
        </v-icon>
        Restrictions :
        <div
          v-for="(restriction, i) in dataRide.restrictions"
          :key="restriction[i]"
        >
          <v-text-field
            v-model="dataRide.restrictions[i]"
            append-outer-icon="mdi-delete"
            @click:append-outer="dataRide.restrictions.splice(i, 1);"
          />
        </div>
      </div>
      <v-btn color="primary" class="white--text" @click="dataRide.restrictions.push('')">
        Ajouter une restriction
      </v-btn>
      <v-divider class="my-4" />
      <v-btn
        :loading="loading"
        :disabled="loading"
        block
        color="green"
        class="white--text"
        @click="save"
      >
        Enregistrer les modifications
      </v-btn>
      <v-alert
        v-if="error"
        text
        border="left"
        color="red"
      >
        {{ error }}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['ride'],
  data: () => {
    return {
      dataRide: null,
      loading: false,
      error: null
    };
  },
  watch: {
    ride: {
      handler(ride) {
        this.dataRide = ride;
      }
    }
  },
  mounted() {
    this.dataRide = this.ride;
  },
  methods: {
    async save() {
      this.loading = true;
      await this.$axios.$patch('/admin/rides', this.dataRide).catch((err) => {
        this.error = err;
      });
      this.loading = false;
    }
  }
};
</script>
