<template>
  <div class="user-settings full-width" v-if="currentUser">
    <q-form class="full-height" @submit="saveUserData">
        <div class="background-photo">
            <div class="default-background" v-if="showBackgroundPhoto()">
                <q-img
                  src="https://cdn.quasar.dev/img/material.png"
                  style="height: 200px;"
                  @click="showPhotoUpload('background')"/>
            </div>
            <div class="user-background" v-else>
                <q-img
                  :src="currentUser.backgroundPhoto"
                  style="height: 200px;"
                  @click="showPhotoUpload('background')"/>
            </div>
        </div>
        <div class="absolute-top q-mt-sm text-white text-center">
            <q-icon
              class="q-mr-sm"
              color="white"
              name="edit"
              size="20px"
              @click="showPhotoUpload('profile')">
            </q-icon>Edit your background image</div>
        <div class="profile-photo text-center" @click="showPhotoUpload('profile')">
            <div class="default-user-image column items-center" v-if="showDefaultPhoto()">
              <q-avatar
                class="q-mb-sm"
                round="round"
                color="blue-grey-10"
                icon="person"
                font-size="110px"
                size="180px"
                text-color="white">
              </q-avatar>
              <span class="text-caption text-blue-grey-10">
                Click to edit
              </span>
            </div>
            <div class="user-image column items-center" v-else>
                <q-avatar
                  class="q-mb-sm shadow-5"
                  size="180px"
                  @click="showPhotoUpload('profile')">
                    <q-img :src="currentUser.profilePhoto"></q-img>
                </q-avatar>
                  <span class="text-blue-grey-10">
                    <q-icon
                    class="q-mr-sm"
                    color="blue-grey-10"
                    name="edit"
                    size="16px">
                    </q-icon>
                    Click to edit
                  </span>
            </div>
        </div>
        <section class='q-pl-md'>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Username"
                  stack-label
                  outlined
                  class="col"
                  id="username"
                  v-model="username"
                  type="text"/>
            </div>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Display name"
                  stack-label
                  outlined
                  class="col"
                  id="fullName"
                  v-model="fullName"
                  type="text"/>
            </div>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Bio"
                  stack-label
                  outlined
                  type="textarea"
                  class="col"
                  id="bio"
                  v-model="bio"
                  />
            </div>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Location"
                  stack-label
                  outlined
                  class="col"
                  id="location"
                  v-model="location"
                  type="text"/>
            </div>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Website URL"
                  stack-label
                  outlined
                  class="col"
                  id="website_url"
                  v-model="website_url"
                  type="text"/>
            </div>
            <div class="row justify-between items-center q-mb-lg">
                <q-input
                  label="Amazon Wishlist"
                  stack-label
                  outlined
                  class="col"
                  id="amazon_wishlist"
                  v-model="amazon_wishlist"
                  type="text"/>
            </div>
<!--
            <div class="row justify-between items-center q-mb-lg">
              <label class="col-3" for="email">Email</label>
                <q-input
                  class="col"
                  id="email"
                  outlined
                  v-model="email"
                  type="text"/>
            </div> -->
        </section>
        <div class="row justify-between q-my-lg q-px-md absolute-bottom-right">

          <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 3">
            <q-btn
              size='lg'
              rounded
              persistent
              style="min-width:6em;"
              type="submit"
              label="SAVE"
              color="primary" />
          </q-page-sticky>

        </div>
    </q-form>
    <q-dialog
      v-model="photoUpload"
      transition-hide="scale"
      transition-show="scale"
      @before-hide="resetPhotoType">

        <FirebaseUploader
          class="q-my-lg"
          label="Please Upload a Photo"
          color="primary"
          square
          :meta="meta"
          :prefixPath="prefixPath"
          @uploaded="uploadComplete"
          auto-upload
          accept=".jpg, image/*"
          flat
          bordered
          style="max-width: 300px"
        />

    </q-dialog>
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import FirebaseUploader from '../../components/FirebaseUploader.vue'

export default {
  name: 'UserSettings',
  components: {
    FirebaseUploader,
  },
  data () {
    const currentUser = this.$store.state.user.currentUser
    return {
      email: currentUser.email || '',
      username: currentUser.username || '',
      website_url: currentUser.website_url || '',
      location: currentUser.location || '',
      amazon_wishlist: currentUser.amazon_wishlist || '',
      fullName: currentUser.fullName || '',
      mobile: currentUser.mobile || '',
      bio: currentUser.bio || '',
      photoType: '',
      photoUpload: false
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
        photoType: this.photoType
      }
    },
    prefixPath () {
      const id = this.currentUser.id,
        path = `profile_photos/${id}/${this.photoType}Photo/`
      return path
    }
  },
  methods: {
    ...mapActions('user', ['updateUserData']),
    ...mapMutations('user', ['setEditUserDialog']),
    resetPhotoType () {
      this.photoType = ''
    },
    async saveUserData () {
      const { currentUser, email, fullName, mobile,
       username, bio, location, website_url, amazon_wishlist } = this

      this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })

      try {
        await this.updateUserData({
          id: currentUser.id,
          amazon_wishlist,
          website_url,
          location,
          username,
          bio,
          email,
          fullName,
          mobile
        })
      } catch (err) {
        this.$q.notify({
          message: `Looks like a problem updating your profile: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        this.setEditUserDialog(false)
      }
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
    },
    showPhotoUpload (type) {
      this.photoUpload = true
      this.photoType = type
    },

    uploadComplete () {
      this.photoUpload = false
      this.$q.notify({
        message: 'Successfully uploaded your photo.',
        color: 'positive'
      })
    }
  }
}
</script>
<style lang="stylus">
  .user-settings
    background-color white
    .default-user-image
      cursor pointer
      color white
      @media(max-width $breakpoint-sm)
        margin-bottom 2em
      .q-icon
        @media(max-width $breakpoint-sm)
          font-size 1em!important

    .profile-photo
      cursor pointer
      margin -6em 0 2em
      .q-avatar
        @media(max-width $breakpoint-sm)
          margin-top 1rem
          height .75em
          width .75em
      .user-image
        .edit
          top 2.5em

    .user-info
      max-width 20.5em
      margin auto
      color $blue-grey-10
      label
        text-align left
        font-weight bold
      input
        background rgba(101,104,110,.20)
        border-radius 6px
        color $blue-grety-10
        font-weight bold
        padding .5em
</style>
