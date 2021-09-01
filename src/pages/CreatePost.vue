<template>
  <q-page>
    <q-input
      class='q-px-md'
      v-model="text"
      autogrow
      :input-style="{'font-size': '18px'}"
      borderless
      placeholder="Compose new post..."
    />
  <q-btn
    flat
    class='q-pa-md'
    round
    color="grey-6"
    icon="eva-image-outline" />
  <q-separator class='q-mt-sm' />
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageCreatePost',
  setup () {
    return {
      text: ref('')
    }
  }
}
</script>
