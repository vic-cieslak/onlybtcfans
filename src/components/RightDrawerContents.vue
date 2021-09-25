<template>
  <q-input
    class='q-pa-md'
    bottom-slots
    color="primary"
    v-model="text"
    clearable
    outlined
    label="Search posts">

    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>

  <div class="q-pt-md">

    <q-btn
      flat
      color="grey-7"
      icon="eva-pricetags-outline" />

    <q-btn
      flat
      color="grey-7"
      icon="eva-refresh-outline" />

    <q-btn
      flat
      color="grey-7"
      icon="eva-arrow-ios-back-outline" />

    <q-btn
      flat
      color="grey-7"
      icon="eva-arrow-ios-forward-outline" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    let text = ref('')

    return { text }
  }
}
</script>

<style>

</style>