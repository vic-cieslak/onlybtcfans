<template>
  <q-layout view="lHr LpR fFf" >
    <q-header
      bordered
      class="bg-white text-grey-10 q-pl-none">
      <q-toolbar >
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title style="font-size: 19px;" class="text-bold q-pl-none">
          <q-btn
            round
            dense
            v-if="$route.fullPath != '/feed'"
            @click='$router.back()'
            flat
            icon='eva-arrow-back'
            color="primary" />
          {{ $route.meta.toolbarTitle }}
        </q-toolbar-title>

        <q-btn
          v-if="$route.fullPath == '/posts/create'"
          unelevated
          label='post'
          rounded
          @click='createPost'
          color="primary" />

        <q-btn
          v-if="$route.fullPath == '/user/settings/profile'"
          unelevated
          label='Save'
          disabled
          rounded
          type='submit'
          color="primary" />

      </q-toolbar>
    </q-header>

    <!-- ------ mobile drawer------- -->
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="280"
      :breakpoint="4500"
      elevated
      class="bg-white text-black"
    >
      <MobileMenuContents :currentUser='currentUser'/>
    </q-drawer>

    <!-- left menu drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      :mini-width="95"
      :width="300"
      :breakpoint="600"
    >
      <!-- REFACTOR this could be refactored as it repeats twice -->
      <div v-if="currentUser" @click="drawerLeft = !drawerLeft">
        <q-list padding class="q-pt-lg q-pl-sm">

          <div class="q-pl-lg grow" v-if="showDefaultPhoto()">
              <q-avatar
                round="round"
                color="blue-grey-10"
                icon="eva-person-outline"
                size="lg"
                text-color="white"></q-avatar>
          </div>
          <div
            class="grow"
            v-bind:class="{ 'q-pl-lg': miniState, 'q-pl-sm': !miniState }"
            v-else>
              <q-avatar class="q-mb-sm shadow-5" size="lg">
                  <q-img :src="currentUser.profilePhoto"></q-img>
              </q-avatar>
          </div>
        </q-list>

      </div>
      <LeftMenuDrawerContents
        :mini="miniState"
        @switchDrawer="drawerLeft = !drawerLeft"
        :currentUser='currentUser'/>
    </q-drawer>

    <!-- right column search and suggestions -->
    <q-drawer
      width=380
      show-if-above
      v-if="searchAndSuggestionsOpen"
      side="right"
      bordered>
      <RightDrawerContents />
    </q-drawer>


    <q-footer
      class="bg-white small-screen-only"
      bordered
      style='height:50px'
      >

      <q-tabs
        style='height:50px'
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
        <div
          v-if="currentUser"
          class='q-pt-xs q-pr-xs'
          @click="drawerLeft = !drawerLeft">

          <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
              <q-avatar
                round="round"
                color="blue-grey-10"
                icon="eva-person-outline"
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

    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref, watch } from "vue";
import { mapGetters, mapActions } from 'vuex'
import MobileMenuContents from 'components/MobileMenuContents'
import LeftMenuDrawerContents from 'components/LeftMenuDrawerContents'
import RightDrawerContents from 'components/RightDrawerContents'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

export default {
  components: {
    MobileMenuContents,
    LeftMenuDrawerContents,
    RightDrawerContents
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    // let searchAndSuggestionsOpen = ref(false)
    const switchToMini = 1300
    const $q = useQuasar()
    const miniState = computed(() => {
      return $q.screen.width < switchToMini
    });

    let searchAndSuggestionsOpen = computed(() => {
      const route = useRoute()
      let showSuggestionsOnPages = ['HomeFeed', 'CreatePost']
      if (showSuggestionsOnPages.includes(route.name)) {
        return true
      } else {
        return false
      }

    });

    // show Suggestions and Search drawer on certain pages
    // const route = useRoute()
    // let showSuggestionsOnPages = ['HomeFeed', 'CreatePost']
    // watch(route, (currentRoute, oldRoute) => {
    //   console.log('wtf')
    //   if (showSuggestionsOnPages.includes(currentRoute.name)) {
    //     searchAndSuggestionsOpen.value = true
    //   } else {
    //     searchAndSuggestionsOpen.value = false
    //   }
    // })
    ////

    function createPost(val) {
      console.log('its working!', val)
    }

    return {
      searchAndSuggestionsOpen,
      miniState,
      createPost,
      leftDrawerOpen,
      drawerLeft: ref(false),
      link: ref(''),
      text: ref(''),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      rightDrawerOpen,
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
  height: 80px
  .q-tab__icon
    font-size: 30px
.q-header
  .q-toolbar__title
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