<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-img
        height="150"
        src="https://bild.romitou.fr/contents/95fYHVJ5S3.png?height=150"
      >
        <v-row align="end" class="fill-height pa-2" justify="center">
          <v-chip v-if="$auth.loggedIn">
            {{ $auth.user.email }}
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
        <v-list-item link nuxt to="/">
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attractions</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="$auth.loggedIn" link nuxt to="account">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Compte</v-list-item-title>
        </v-list-item>
        <v-list-item v-else link nuxt to="login">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Se connecter</v-list-item-title>
        </v-list-item>
        <v-list-item v-show="$auth.loggedIn && $auth.user.admin" link nuxt to="admin">
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
        <v-divider class="ma-2" />
        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            persistent-hint
          />
          <v-list-item-title>Thème sombre</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="primary"
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
