<template>
  <v-container>
    <v-btn @click="postData" />
  </v-container>
</template>

<script>
export default {
  methods: {
    async postData() {
      await this.$axios.post('/api/rides');
    }
  }
};
</script>
