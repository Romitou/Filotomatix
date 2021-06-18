<template>
  <v-container>
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Nom de l'attraction
            </th>
            <th class="text-left">
              Temps d'attente
            </th>
            <th class="text-left">
              File d'attente
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ride in rides"
            :key="ride._id"
          >
            <td>
              <v-icon
                v-if="ride.status === 'closed'"
                class="red--text mr-1"
                dark
              >
                mdi-clock-alert-outline
              </v-icon>
              <v-icon
                v-else-if="ride.status === 'full'"
                class="red--text mr-1"
                dark
              >
                mdi-account-cancel
              </v-icon>
              <v-icon
                v-else
                class="green--text mr-1"
                dark
              >
                mdi-check-circle-outline
              </v-icon>
              {{ ride.name }}
            </td>
            <td>{{ ride.waitTimeMins }} minute{{ ride.waitTimeMins > 1 ? 's' : '' }}</td>
            <td> {{ ride.queueLength }} visiteur{{ ride.queueLength > 1 ? 's' : '' }}</td>
            <td>
              <v-btn
                :to="'admin/rides/' + ride._id"
                color="grey"
                icon
              >
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn
      class="mt-5"
      color="primary"
      nuxt
      to="admin/rides/new"
    >
      Ajouter une attraction
      <v-icon
        dark
        right
      >
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const req = await $axios.$get('/rides');
    return { rides: req };
  },
  data() {
    return {
      rides: [],
      error: false
    };
  }
};
</script>
