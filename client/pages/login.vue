<template>
  <div>
    <InfoBar :info="null" />
    <v-container>
      <div class="body-2">
        Veuillez saisir une adresse électronique et un mot de passe pour vous connecter.
        Si vous n’avez pas encore de compte, un compte sera créé en votre nom.
      </div>
      <v-form
        ref="form"
        v-model="valid"
        class="my-4"
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Adresse mail"
          outlined
          dense
          required
        />

        <v-text-field
          v-model="password"
          type="password"
          :rules="passwordRules"
          label="Mot de passe"
          outlined
          dense
          required
        />

        <div class="body-2 mb-4">
          En vous enregistrant ou en vous connectant, vous acceptez les Conditions d’utilisation Filotomatix. Vos données sont utilisées uniquement pour les besoins de l’accès et du fonctionnement de Filotomatix.
        </div>

        <v-alert
          v-if="error"
          border="left"
          color="red"
          class="body-2"
          dense
          text
        >
          {{ error }}
        </v-alert>

        <v-btn
          :disabled="!valid || loading"
          :loading="loading"
          color="success"
          @click="login"
          block
        >
          Se connecter / s'enregistrer
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      error: undefined,
      loading: false,
      valid: true,
      email: null,
      emailRules: [
        v => !!v || 'Veuillez saisir votre adresse mail.',
        v => /.+@.+\..+/.test(v) || 'Veuillez saisir une adresse mail valide.'
      ],
      password: null,
      passwordRules: [
        v => !!v || 'Veuillez saisir votre mot de passe.',
        v => (v && v.length >= 6) || 'Veuillez saisir un mot de passe de plus de 6 caractères.'
      ]
    };
  },
  methods: {
    async login() {
      this.loading = true;
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      }).catch((e) => {
        this.error =
          e.response.data?.message ||
          'Une erreur est survenue lors de l\'envoi des données.';
        this.loading = false;
      });
      if (this.$auth.loggedIn)
        await this.$router.push('/account');
    }
  }
};
</script>
