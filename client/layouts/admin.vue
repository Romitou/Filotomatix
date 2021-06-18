<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-img
        aspect-ratio="16:9"
        height="150"
        src="https://cache.filevirtuelle.parcasterix.fr/images/pages/nav.jpg"
      >
        <v-row align="end" class="fill-height pa-2" justify="center">
          <v-chip v-if="this.$auth.loggedIn">
            {{ this.$auth.user.email }}
          </v-chip>
          <v-chip v-else>
            Invité
          </v-chip>
        </v-row>
      </v-img>
      <v-list
        dense
        nav
      >
        <v-list-item link nuxt to="/admin">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>
        <v-list-item link nuxt to="/admin/rides">
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attractions</v-list-item-title>
        </v-list-item>
        <v-list-item link nuxt to="/admin/users">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Utilisateurs</v-list-item-title>
        </v-list-item>
        <v-divider class="ma-2" />
        <v-list-item link nuxt to="/">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Retour</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="#134483"
      fixed
    >
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <img
        alt="Icône Filotomatix"
        class="icon pa-1 mr-1"
        src="~/assets/filotomatix.png"
      >
      <v-toolbar-title class="white--text">
        Filotomatix
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  beforeCreate() {
    if (!this.$auth.loggedIn && this.$auth.user.admin)
      this.$router.push('/login');
  }
};
</script>
