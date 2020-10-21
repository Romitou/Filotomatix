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
          <v-chip v-if="this.$auth.loggedIn">
            {{ this.$auth.user.email }}
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
        <v-list-item v-if="this.$auth.loggedIn" to="account" link nuxt>
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
        <v-list-item v-if="this.$auth.loggedIn && this.$auth.user.admin" to="admin" link nuxt>
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
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
      title: 'Filotomatix'
    };
  }
};
</script>
