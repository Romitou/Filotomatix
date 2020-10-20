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
            Veuillez saisir une adresse mail ainsi qu'un mot de passe pour vous connecter. Si vous n'avez pas encore de compte, il sera automatiquement créé.
          </div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Adresse mail"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Mot de passe"
              required
            />

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 mt-4"
              @click="login"
            >
              Se connecter / s'enregistrer
            </v-btn>
            <v-alert
              v-if="error"
              class="mt-5 mb-0"
              text
              dense
              border="left"
              type="error"
              icon="mdi-cloud-alert"
            >
              Oups, une erreur est survenue. {{ error }}
            </v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      error: undefined,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Veuillez saisir votre adresse mail.',
        v => /.+@.+\..+/.test(v) || 'Veuillez saisir une adresse mail valide.'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Veuillez saisir votre mot de passe.',
        v => (v && v.length >= 6) || 'Veuillez saisir un mot de passe de plus de 6 caractères.'
      ]
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      }).catch(e => (this.error = e));
      await this.$router.push('/account');
    }
  }
};
</script>
