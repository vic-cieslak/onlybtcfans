<template>
  <q-list padding class="menu-list q-pt-xs q-pl-sm">
    <!-- REFACTOR , those q-items could go into separate components -->
    <q-item
      clickable
      v-ripple
      to='/feed'
      :active="link === 'feed'"
      @click="link = 'feed'"
      active-class="text-black"
      >
      <q-item-section avatar>
        <q-icon size='md' name="eva-home-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        Home
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to='/my/notifications'
      :active="link === 'notifications'"
      @click="link = 'notifications'"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-bell-outline" />
      </q-item-section>

      <q-item-section class='menu-items'  v-if='!mini'>
        Notifications
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to='/my/chats'
      :active="link === 'messages'"
      @click="link = 'messages'"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-message-square-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        Messages
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to='/bookmarks'
      :active="link === 'bookmarks'"
      @click="link = 'bookmarks'"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-bookmark-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        Bookmarks
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to='/my/lists'
      :active="link === 'lists'"
      @click="link = 'lists'"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-list-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        Lists
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to='/my/subscriptions'
      :active="link === 'subscriptions'"
      @click="link = 'subscriptions'"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-people-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        Subscriptions
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      to="/user/profile"
      :active="link === 'profile'"
      @click="link = 'profile'"
      active-class="text-black"
      class="menu-items">
      <q-item-section avatar>
        <q-icon size='md' name="eva-person-outline" />
      </q-item-section>

      <q-item-section  v-if='!mini'>
        My profile
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      @click="$emit('switchDrawer')"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-more-horizontal-outline" />
      </q-item-section>

      <q-item-section class='menu-items' v-if='!mini'>
        More
      </q-item-section>
    </q-item>

    <q-item class='q-pl-sm q-pt-lg'>
        <q-btn
          v-if='!miniState'
          to='/posts/create'
          style="width: 300px; height: 45px"
          unelevated
          align="between"
          rounded
          color="primary">
          <q-icon left color='white' name='add' />
                <q-space />
                New post
                <q-space />
          </q-btn>
        <q-btn
          v-else
          to='/posts/create'
          unelevated
          round
          color="primary">
          <q-icon color='white' name='add' />

        </q-btn>
    </q-item>

  </q-list>
</template>

<script>
import { mapActions } from 'vuex'
import { useQuasar } from 'quasar'
import { computed, ref } from "vue";

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    mini: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    showDefaultPhoto () {
      return this.currentUser.profilePhoto === '' ||
        this.currentUser.profilePhoto === null ||
        this.currentUser.profilePhoto === undefined
    }
  },
  setup () {
    const $q = useQuasar()
    let switchToMini = 1300
    const miniState = computed(() => {
      return $q.screen.width < switchToMini
    });
    return { miniState }
  }

}
</script>

<style>

</style>