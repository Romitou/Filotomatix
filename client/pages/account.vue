<template>
  <v-container>
    <div class="mt-3">
      <v-card
        class="mx-auto d-flex justify-center mb-6"
        width="600"
        rounded
      >
        <v-card-text class="text--primary">
          <div>
            Présentez ce QR Code au service clientèle pour vous identifier.
          </div>
          <br>
          <v-btn
            color="blue-grey"
            class="white--text"
            @click="logout"
          >
            Déconnexion
            <v-icon
              right
            >
              mdi-logout-variant
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  auth: true,
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push('/');
    }
  }
};
</script>
