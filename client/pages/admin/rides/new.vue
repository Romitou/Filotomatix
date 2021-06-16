<template>
  <div class="mt-3">
    <v-card
      class="mx-auto d-flex justify-center mb-6"
      width="600"
      rounded
    >
      <v-card-text class="text--primary">
        <div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              label="Nom de l'attraction"
              required
            />

            <v-text-field
              v-model="image"
              :rules="imageRules"
              label="Adresse de l'image"
              required
            />

            <v-row class="justify-center mt-2">
              <v-col
                cols="12"
                sm="6"
                md="5"
              >
                <v-text-field
                  v-model="throughput"
                  label="Débit de visiteurs"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="5"
              >
                <v-text-field
                  v-model="maxReservations"
                  label="Réservations maximales"
                  outlined
                />
              </v-col>
            </v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="sendRide"
            >
              Validate
            </v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  auth: true,
  data() {
    return {
      valid: true,
      name: undefined,
      image: undefined,
      imageRules: [
        v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gm.test(v) || 'L\'adresse de l\'image doit être valide.'
      ],
      throughput: undefined,
      maxReservations: undefined
    };
  },
  methods: {
    async sendRide() {
      await this.$axios.post('/admin/rides', {
        name: this.name,
        image: this.image,
        throughput: this.throughput,
        maxReservations: this.maxReservations
      });
      await this.$router.push('/admin');
    }
  }
};
</script>
