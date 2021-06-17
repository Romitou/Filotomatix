<template>
  <v-app>
    <v-app-bar
      clipped-left
      fixed
      app
      color="#134483"
    >
      <v-btn icon to="/">
        <v-icon class="white--text">
          mdi-arrow-left
        </v-icon>
      </v-btn>
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
</script>
