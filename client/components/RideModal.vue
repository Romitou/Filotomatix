<template>
  <div>
    <v-img
      :src="ride.image"
      height="200"
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
    <v-container>
      <div class="blue-grey--text text-h6">
        {{ ride.name }}
      </div>
      <div>
        <div v-if="ride.status === 'closed'">
          <div class="red--text">
            <v-icon color="red">
              mdi-cancel
            </v-icon>
            Fermé
          </div>
        </div>
        <div v-else-if="ride.status === 'full'">
          <div class="orange--text">
            <v-icon color="orange">
              mdi-account-cancel
            </v-icon>
            Complet
          </div>
        </div>
        <div v-else>
          <div class="green--text">
            <v-icon color="green">
              mdi-check-circle-outline
            </v-icon>
            Ouvert
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div v-if="ride.status === 'open'">
        <v-dialog
          max-width="600"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              block
              dark
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                mdi-location-enter
              </v-icon>
              Accéder à cette file d'attente
            </v-btn>
          </template>
          <template #default="dialog">
            <v-card>
              <v-toolbar
                color="green"
                dark
              >
                <img
                  alt="Icône Filotomatix"
                  class="icon pa-1 mr-1"
                  src="~/assets/filotomatix.png"
                >
                Filotomatix Unité
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click="dialog.value = false;"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="mt-3">
                Accédez directement à l'attraction en évitant une attente de <strong>{{ ride.waitTimeMins }} minutes</strong> en achetant un <span class="green--text"><strong>Filotomatix Unité</strong></span> utilisable une fois sur cette attraction !
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                >
                  Non merci
                </v-btn>
                <v-btn
                  text
                  color="green"
                >
                  Acheter
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <p class="mt-1 blue-grey--text subtitle-2" style="text-align: center;">
          Temps d'attente estimé à {{ ride.waitTimeMins }} minute{{ ride.waitTimeMins > 1 ? 's' : '' }}
        </p>
      </div>
      <div v-else-if="ride.status === 'closed'">
        <v-btn block class="white--text" color="primary" disabled>
          <v-icon left>
            mdi-location-enter
          </v-icon>
          Accéder à cette file d'attente
        </v-btn>
        <v-alert
          border="left"
          class="mt-2 body-2"
          color="red"
          dense
          text
        >
          Désolé, cette attraction est actuellement fermée, il est donc impossible d'accéder à sa file d'attente pour le
          moment.
        </v-alert>
      </div>
      <div v-else-if="ride.status === 'full'">
        <v-btn block class="white--text" color="primary" disabled>
          <v-icon left>
            mdi-location-enter
          </v-icon>
          Accéder à cette file d'attente
        </v-btn>
        <v-alert
          border="left"
          class="mt-2 body-2"
          color="orange"
          dense
          text
        >
          Beaucoup de visiteurs ont réservé cette attraction : sa file d'attente est complète !
          N'hésitez pas à réserver d'autres attractions et revenir plus tard.
        </v-alert>
      </div>
      <v-divider class="my-4" />
      <div class="my-3 body-2">
        <v-icon>
          mdi-card-text
        </v-icon>
        {{ ride.description || 'Aucune description' }}
      </div>
      <div class="my-3 body-2">
        <v-icon>
          mdi-map-marker
        </v-icon>
        {{ ride.position || 'Aucune position' }}
      </div>
      <div class="my-3 subtitle-2">
        <v-icon>
          mdi-alert
        </v-icon>
        {{ ride.restrictions.length >= 1 ? 'Restrictions :' : 'Aucune restriction' }}
        <div class="body-2">
          <ul>
            <li v-for="restriction in ride.restrictions" :key="restriction">
              {{ restriction }}
            </li>
          </ul>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['ride']
};
</script>
