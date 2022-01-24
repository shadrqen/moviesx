<template>
  <v-app>
    <v-footer
      class="footer"
      color="#344754"
    >
      <v-container>
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            class="text-center white--text copyright text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption"
            cols="12"
          >
            &copy; {{ new Date().getFullYear() }} MovieX. All rights reserved
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'BaseFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
