<template>
  <v-app-bar
    app
    class="app_bar elevation-1"
    dark
    dense
    height="50%"
  >
    <v-container>
      <v-toolbar-title class="primary-toolbar-title">
        MoviesX
      </v-toolbar-title>
    </v-container>
  </v-app-bar>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'BaseHeader'
})
</script>

<style lang="scss" scoped>
</style>
