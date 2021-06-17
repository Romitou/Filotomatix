<template>
  <div>
    <InfoBar :info="null" />
    <v-container>
      <div>
        Vous pouvez utiliser ce code QR pour vous identifier auprès du service clientèle.
      </div>
      <div class="text-center">
        <img v-if="qrCode" :src="qrCode" height="200" alt="Account QR code">
      </div>
      <v-btn
        block
        color="blue-grey"
        class="white--text"
        @click="logout"
      >
        Déconnexion
        <v-icon right>
          mdi-logout-variant
        </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      qrCode: null
    };
  },
  mounted() {
    this.fetchQrCode();
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push('/login');
    },
    async fetchQrCode() {
      const qrResponse = await this.$axios.$get('/auth/qrcode');
      if (!qrResponse)
        return;
      const { qrCode } = qrResponse;
      this.qrCode = qrCode;
    }
  }
};
</script>
