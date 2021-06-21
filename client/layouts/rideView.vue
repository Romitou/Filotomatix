<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="primary"
      fixed
    >
      <v-btn icon to="/">
        <v-icon class="white--text">
          mdi-arrow-left
        </v-icon>
      </v-btn>
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
</script>
