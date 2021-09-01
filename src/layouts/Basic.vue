<template>
  <q-layout class="main" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'BasicLayout',
  computed: {
    productName () {
      return window.sessionStorage.productName
    }
  },
  data () {
    return {
    }
  }
}
</script>


<style lang="stylus" scoped>
  .q-page
    background: white
</style>