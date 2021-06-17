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
          <v-chip v-if="$auth.loggedIn">
            {{ $auth.user.email }}
          </v-chip>
          <v-chip v-else>
            Invité
          </v-chip>
        </v-row>
      </v-img>
      <v-list
        nav
        dense
      >
        <v-list-item link to="/" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attractions</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="$auth.loggedIn" to="account" link nuxt>
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Compte</v-list-item-title>
        </v-list-item>
        <v-list-item v-else to="login" link nuxt>
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Se connecter</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="$auth.loggedIn && $auth.user.isAdmin" to="admin" link nuxt>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Administration</v-list-item-title>
        </v-list-item>
        <v-divider class="ma-2" />
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Comment utiliser ?</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      fixed
      app
      color="#134483"
    >
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <img
        src="~/assets/filotomatix.png"
        class="icon pa-1 mr-1"
        alt="Icône Filotomatix"
      >
      <v-toolbar-title class="white--text">
        Filotomatix
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>
