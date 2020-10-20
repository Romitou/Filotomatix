<template>
  <div class="mt-3">
    <v-card
      class="d-flex justify-center mb-6"
      flat
    >
      <v-card
        class="mx-auto"
        rounded
      >
        <v-card-text class="text--primary">
          <div>
            Présentez ce QR Code au service clientèle pour vous identifier.
          </div>
          <div class="text-center mt-2">
            <qrcode :value="this.$auth.user.email" :options="{ width: 150 }" />
          </div>
          <br />
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
    </v-card>
  </div>
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
