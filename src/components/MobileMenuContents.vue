<template>
    <q-scroll-area class="fit">
      <div v-if="currentUser">

        <div class="q-pa-lg grow" v-if="showDefaultPhoto()">
            <q-avatar
              round="round"
              color="blue-grey-10"
              icon="eva-person-outline"
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
          :to="{name: 'UserSettings'}"
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
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'

export default {
  props: {
    currentUser: {
      type: Object,
      requred: true
    }
  },
  setup(){
    let link = ref('')
    return {
      link
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