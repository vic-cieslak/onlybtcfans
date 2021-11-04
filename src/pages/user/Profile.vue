<template >
<q-page v-if="currentUser">
    <div class="background-photo">
        <div class="default-background" v-if="showBackgroundPhoto()">
          <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;">
          </q-img>
        </div>
        <div class="user-background" v-else>
          <q-img :src="currentUser.backgroundPhoto" style="height: 200px;">
          </q-img>
        </div>
    </div>
    <div class="profile-container ">
        <div class="profile-photo">
          <div class="default-user-image text-left q-pl-lg" v-if="showDefaultPhoto()">
              <q-avatar
                class='inline-flex'
                round="round"
                color="blue-grey-10"
                icon="eva-person-outline"
                font-size="100px"
                size="120px"
                text-color="white"></q-avatar>
              <div class='inline-flex q-pr-lg q-pa-lg'>
                <q-btn
                  class="q-ma-xs"
                  rounded
                  to='/user/settings/profile'
                  color="white"
                  bordered
                  text-color='primary'
                  icon="settings">
                  <div class='q-pl-sm'>edit profile</div>
                  </q-btn>

                <q-btn
                  round
                  color="white"
                  bordered
                  text-color='primary'
                  icon="open_in_new"
                  >
                </q-btn>
              </div>
          </div>

          <div class="user-image text-left q-pl-lg" v-else>

            <div class='row justify-between items-end'>
              <q-avatar class="q-mb-sm inline-flex shadow-5" size="140px">
                <q-img :src="currentUser.profilePhoto"></q-img>

              </q-avatar>
                <div class='inline-flex q-pr-lg'>
                  <q-btn
                    class="q-ma-xs"
                    rounded
                    to='/user/settings/profile'
                    color="white"
                    bordered
                    text-color='primary'
                    icon="settings">
                    <div class='q-pl-sm'>edit profile</div>
                    </q-btn>

                  <q-btn
                    round
                    color="white"
                    bordered
                    text-color='primary'
                    icon="open_in_new"
                    >
                  </q-btn>
                </div>

            </div>

              <div class="text-weight-bold text-h6">{{ getUserData('fullName') }}</div>
              <div class="row text-weight-bold text-h7 text-grey-6">
                <div class='inline-flex'>

                <q-btn
                  flat
                  dense
                  unelevated
                  no-caps
                  class='q-pl-none'
                  color="grey-6"
                  >
                  {{ getUserData('username') }}

                </q-btn>

                </div>
                <div class='inline-flex q-mt-none q-px-xs'>  .   </div>
                <div class='inline-flex'>

                  <q-btn-dropdown
                    flat
                    dense
                    unelevated
                    no-caps
                    color="grey-6"
                    label="Invisible">
                      <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Invisible</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Available</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                  </q-btn-dropdown>
                </div>

              </div>
              <div class="q-pt-sm"> {{ getUserData('bio') }}</div>
              <div class="text-weight-bold text-h7 text-grey-6 q-pb-lg">
                 {{ getUserData('location') }}</div>
          </div>

        </div>

        <!-- <div class="user-info q-mt-lg">
          <div class="row justify-between">
            <label class="text-h6 text-body1">Email:</label>
            <p class="text-h6 text-body1 ">{{ getUserData('email') }}</p>
          </div>
          <div class="row justify-between">
            <label class="text-body1 text-left">Mobile Number:</label>
            <p class="text-body1 text-right">{{ getUserData('mobile') }}</p>
          </div>
        </div> -->

     <q-separator class='q-pt-sm' color='grey-3'/>
       <div class="q-gutter-y-md" >
          <q-card flat>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="mails" label="Posts" />
              <q-tab name="alarms" label="Media" />
              <q-tab name="movies" label="Archived" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="mails">
                <div class="text-h6">Posts</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="alarms">
                <div class="text-h6">Media</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="movies">
                <div class="text-h6">Archived</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
          </q-card>

        </div>

    </div>

    <q-dialog v-model="editUserDialog" full-height="full-height" persistent="persistent" @before-hide="setBlur">
      <user-settings></user-settings>
    </q-dialog>
</q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { QSpinnerGears, QSpinnerRadio } from 'quasar'
import UserSettings from './profile/UserSettings.vue'
import { ref } from 'vue'

export default {
  name: 'Profile',
  components: {
    UserSettings,
  },
  data () {
    return {
      tab: ref('mails'),
    }
  },
  created () {
    // Boolean to check if network is available
    const isOnline = window.navigator.onLine

    this.$q.loading.show({
      message: isOnline ? 'Loading your user information...' : 'Looks like you\'ve lost network connectivity. Please connect back to your network to access your data.',
      backgroundColor: isOnline ? 'grey' : 'red-6',
      spinner: isOnline ? QSpinnerGears : QSpinnerRadio,
      customClass: 'loader'
    })
  },
  mounted () {
    const { currentUser } = this
    if (currentUser) {
      // Hide the loading screen if currentUser
      // is available before the page renders
      this.$q.loading.hide()
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    editUserDialog: {
      get () {
        return this.$store.state.user.editUserDialog
      },
      set (val) {
        this.setEditUserDialog(val)
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setEditUserDialog']),
    getUserData (attr) {
      return (this.currentUser[attr]) ? this.currentUser[attr] : 'Please update your profile'
    },
    setBlur () {
      this.$emit('setBlur')
    },
    showBackgroundPhoto () {
      return this.currentUser.backgroundPhoto === '' ||
        this.currentUser.backgroundPhoto === null ||
        this.currentUser.backgroundPhoto === undefined
    },
    showDefaultPhoto () {
      return this.currentUser.profilePhoto === '' ||
        this.currentUser.profilePhoto === null ||
        this.currentUser.profilePhoto === undefined
    }
  },
  watch: {
    currentUser () {
      this.$q.loading.hide()
    }
  }
}
</script>
<style lang="stylus">
  .background-photo
    cursor pointer
  .profile-container
    position relative
    text-align center
    background rgba(0,0,0,0)
    top -4.6em
  .user-info
    margin 2em auto
    max-width 24em
    position relative
</style>
