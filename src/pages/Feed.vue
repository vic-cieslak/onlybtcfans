<template>
  <q-page>
  <div class="row items-start">

    <Post :user='currentUser'></Post>

  </div>
  </q-page>
</template>

<script>
import Post from 'components/Post'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageFeed',
  components: {Post},
  setup () {
    return {
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
  },
}
</script>

