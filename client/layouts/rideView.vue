<template>
  <v-app>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-btn icon to="/">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <img
        src="~/assets/filotomatix.png"
        class="icon"
        alt="Icône Filotomatix"
      >
      <v-toolbar-title>Filotomatix</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
</script>
