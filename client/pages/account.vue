<template>
  <div>
    <InfoBar :info="null" />
    <v-container>
      <div>
        Vous pouvez utiliser ce code QR pour vous identifier auprès du service clientèle.
      </div>
      <img :src="qrLink" alt="Account QR code">
      <v-btn
        block
        color="blue-grey"
        class="white--text mt-4"
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
      qrLink: null
    };
  },
  mounted() {
    this.qrLink = `${this.$config.axios.browserBaseURL}/auth/qrcode`;
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push('/');
    }
  }
};
</script>
