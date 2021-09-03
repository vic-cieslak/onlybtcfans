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


    <!-- ------ overlay drawer------- -->
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="280"
      :breakpoint="4500"
      elevated
      class="bg-white text-black"
    >
      <q-scroll-area class="fit">
          <div v-if="currentUser">

            <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
                <q-avatar
                  round="round"
                  color="blue-grey-10"
                  icon="person"
                  font-size="100px"
                  size="xl"
                  text-color="white"></q-avatar>
            </div>
            <div class="q-pa-lg grow" v-else>
                <q-avatar class="q-mb-sm shadow-5" size="xl">
                    <q-img :src="currentUser.profilePhoto"></q-img>
                </q-avatar>
            </div>

          </div>
          <q-list padding class="overlay-menu-list q-pt-lg">

            <q-separator/>

            <q-item
              clickable
              v-ripple
              to="/user/profile"
              :active="link === 'profile'"
              @click="link = 'profile'"
              active-class="text-black"
              class="overlay-menu-items">
              <q-item-section avatar>
                <q-icon size='md' name="eva-person-outline" />
              </q-item-section>

              <q-item-section>
                My profile
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

              <q-item-section class='overlay-menu-items'>
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

              <q-item-section class='overlay-menu-items'>
                Lists
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              to='/my/settings'
              :active="link === 'settings'"
              @click="link = 'settings'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-settings-2-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Settings
              </q-item-section>
            </q-item>
            <q-separator/>

            <q-item
              clickable
              v-ripple
              to='/my/payments'
              :active="link === 'payments'"
              @click="link = 'payments'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-credit-card-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Payments
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              to='/my/bank'
              :active="link === 'bank'"
              @click="link = 'bank'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-home-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Add bank
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-item
              clickable
              v-ripple
              to='/help'
              :active="link === 'help'"
              @click="link = 'help'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-question-mark-circle-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Help
              </q-item-section>
            </q-item>


            <q-item
              clickable
              v-ripple
              to='/darkmode'
              :active="link === 'darkmode'"
              @click="link = 'darkmode'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-moon-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Dark mode
              </q-item-section>
            </q-item>


            <q-item
              clickable
              v-ripple
              to='/language'
              :active="link === 'language'"
              @click="link = 'language'"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-globe-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                English
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-item
              clickable
              v-ripple
              @click="logoutUser()"
              active-class="text-black">
              <q-item-section avatar>
                <q-icon size='md' name="eva-log-out-outline" />
              </q-item-section>

              <q-item-section class='overlay-menu-items'>
                Log out
              </q-item-section>
            </q-item>


          </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="900"
    >

      <!-- DRY IT MAKE IT INTO IMPORTABLE COMPONENT -->
      <div v-if="currentUser">

        <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
            <q-avatar
              round="round"
              color="blue-grey-10"
              icon="person"
              font-size="100px"
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



    <!-- right column search and suggestions -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>

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

    </q-drawer>


    <q-footer
      class="bg-white small-screen-only"
      bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent">
        <q-route-tab
          to="/feed"
          exact
          icon="eva-home-outline"/>
        <q-route-tab
          to="/my/notifications"
          exact
          icon="eva-bell-outline"/>
        <q-route-tab
          to="/posts/create"
          exact
          icon="eva-plus-square-outline"/>
        <q-route-tab
          to="/my/chats"
          exact
          icon="eva-message-square-outline"/>
        <!-- DRY IT MAKE IT INTO IMPORTABLE COMPONENT -->
        <div v-if="currentUser" class='q-pt-sm' @click="drawerLeft = !drawerLeft">

          <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
              <q-avatar
                round="round"
                color="blue-grey-10"
                icon="person"
                font-size="100px"
                size="sm"
                text-color="white"></q-avatar>
          </div>
          <div class="q-pa-lg grow" v-else>
              <q-avatar class="q-mb-sm shadow-5" size="sm">
                  <q-img :src="currentUser.profilePhoto"></q-img>
              </q-avatar>
          </div>
        </div>

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

    showDefaultPhoto () {
      return this.currentUser.profilePhoto === '' ||
        this.currentUser.profilePhoto === null ||
        this.currentUser.profilePhoto === undefined
    }
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
.overlay-menu-list .q-item
  border-radius: 0 32px 32px 0
  color: black
.overlay-menu-items
  font-size: 13px
  font-weight: bold
body.desktop
  .q-hoverable:hover
    > .q-focus-helper
      background-color: $primary
    color: $primary
</style>