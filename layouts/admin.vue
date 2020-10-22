<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-img
        src="https://cache.filevirtuelle.parcasterix.fr/images/pages/nav.jpg"
        aspect-ratio="16:9"
        height="150"
      >
        <v-row class="fill-height pa-2" align="end" justify="center">
          <v-chip>
            {{ this.$auth.user.email }}
          </v-chip>
        </v-row>
      </v-img>
      <v-list
        nav
        dense
      >
        <v-list-item link to="/admin" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attractions</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/users" link nuxt>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Utilisateurs</v-list-item-title>
        </v-list-item>
        <v-divider class="ma-2" />
        <v-list-item to="/" link nuxt>
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Retour</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img src="https://www.parcasterix.fr/sites/default/files/imce/pa-logo-filotomatix-vertical_rvb_0.png" class="icon" alt="Icône Filotomatix">
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Panel d\'administration'
    };
  }
};
</script>
