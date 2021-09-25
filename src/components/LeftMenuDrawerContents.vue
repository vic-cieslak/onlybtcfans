<template>
  <div v-if="currentUser" @click="drawerLeft = !drawerLeft">

    <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
        <q-avatar
          round="round"
          color="blue-grey-10"
          icon="eva-person-outline"
          size="lg"
          text-color="white"></q-avatar>
    </div>
    <div class="q-pa-lg grow" v-else>
        <q-avatar class="q-mb-sm shadow-5" size="lg">
            <q-img :src="currentUser.profilePhoto"></q-img>
        </q-avatar>
    </div>

  </div>


  <q-list padding class="menu-list q-pt-lg q-pl-sm">

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

      <q-item-section class='menu-items'>
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

      <q-item-section class='menu-items'>
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

      <q-item-section class='menu-items'>
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

      <q-item-section class='menu-items'>
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

      <q-item-section class='menu-items'>
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

      <q-item-section class='menu-items'>
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

      <q-item-section >
        My profile
      </q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      @click="drawerLeft = !drawerLeft"
      active-class="text-black">
      <q-item-section avatar>
        <q-icon size='md' name="eva-more-horizontal-outline" />
      </q-item-section>

      <q-item-section class='menu-items'>
        More
      </q-item-section>
    </q-item>

    <q-item class='q-pl-sm q-pt-lg'>
      <q-btn
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
    </q-item>

  </q-list>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    link: {
      type: String,
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
  }
}
</script>

<style>

</style>