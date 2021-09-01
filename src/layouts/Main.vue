<template>
  <q-layout view="lHr lpR fFf">
    <q-header
      bordered
      class="bg-white text-grey-10">
      <q-toolbar >
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title style="font-size: 19px;" class="text-bold q-ml-sm">
          HOME
        </q-toolbar-title>

        <q-btn
          v-if="$route.fullPath == '/posts/create'"
          unelevated
          label='post'
          rounded
          color="primary" />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="280"
      :breakpoint="4500"
      elevated
      class="bg-white text-black"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </div>
      </q-scroll-area>
    </q-drawer>





    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="500"
    >
      <q-avatar class='q-pa-lg grow' size='lg' @click="logoutUser()">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>

      <q-list padding class="menu-list q-pt-lg q-pl-sm">

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
    </q-drawer>



    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->

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
    </q-drawer>


    <q-footer
      class="bg-white small-screen-only"
      bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent">
        <q-route-tab
          to="/"
          exact
          icon="eva-home-outline"/>
        <q-route-tab
          to="/camera"
          exact
          icon="eva-camera-outline"/>
      </q-tabs>

    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)


    return {
      leftDrawerOpen,
      drawerLeft: ref(false),
      link: ref(''),
      text: ref(''),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
  },
}
</script>

<style lang="sass">
.q-footer
  .q-tab__icon
    font-size: 30px
.q-header
  .q-toolbar__title
    @media (max-width: $breakpoint-xs-max)
      text-align: center
    font-size: 30px
  .q-toolbar
    @media (min-width: $breakpoint-sm-min)
      min-height: 77px
.menu-list .q-item
  border-radius: 0 32px 32px 0
  color: grey
.menu-items
  font-size: 22px
body.desktop
  .q-hoverable:hover
    > .q-focus-helper
      background-color: $primary
    color: $primary
</style>