<template>
  <base-layout>
    <template #header>
      <base-header />
    </template>
    <template #default>
      <v-main>
        <router-view />
      </v-main>
    </template>
    <template #footer>
      <base-footer />
    </template>
  </base-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

export default Vue.extend({
  name: 'App',
  components: {
    BaseLayout,
    BaseHeader,
    BaseFooter
  }
})
</script>

<style lang="scss">
.v-application--wrap {
  min-height: max-content !important;
}
</style>
