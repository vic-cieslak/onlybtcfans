<template>
    <!-- <q-layout
        view="lhh LpR lff"
        container
        style="height: 653px; width: 375"
        class="shadow-2 rounded-borders"> -->
    <div class="flex flex-center">
      <div class="q-pr-lg">
        <h4 class='text-center q-pt-sm'>
          Mobile optimized social auth page</h4>
        <h6 class='text-center'>web optimized coming soon</h6>
        <div class="text-center">
          <q-btn
            type="a"
            href="https://imgur.com/a/WpkPbzK"
            target="_blank"
            color="red-7"
            icon-right="open_in_new"
            label="inspired by Tinder" />
        </div>
      </div>
      <div class="q-py-lg">
        <q-layout
          view="lhh LpR lff"
          container
          style="height: 653px; width: 375px;"
          class="shadow-2 rounded-borders q-pt-xl">

        <q-page-container >
          <q-page
            class="flex flex-center">
              <img
                class='q-pt-xl'
                alt="casting logo"
                src="~assets/quasar-firebase-text-white.png"
                style="width: 50%; height: 50%"
              >
              <div class='q-px-xl q-pt-lg text-justify' style='color: white; font-weight: 500'>
                By tapping the button below, you agree with our <b><i>Terms</i></b> and <b><i>Privacy Policy</i></b>.

              </div>

              <div class="row justify-center">
                <div class='col-12 q-pb-sm q-px-lg'>
                  <q-btn
                    unelevated
                    style="height:50px;"
                    rounded
                    class="full-width"
                    text-color='grey-8'
                    color="white"
                    @click="facebookLoginUser()"
                    >
                  <q-icon left color='blue' name='fab fa-facebook' />
                    <q-space />
                    Sign in with Facebook
                    <q-space />
                  </q-btn>
                </div>

                <div class='col-12 q-py-sm q-px-lg'>
                  <q-btn
                    unelevated
                    rounded
                    class="full-width"
                    style="height:50px;"
                    text-color='grey-8'
                    color="white"
                    @click="googleLoginUser()"
                    >
                    <q-icon
                      left
                      class='fa-google-g-new'
                      name='fab fa-google' />
                    <q-space />
                    Sign in with Google
                    <q-space />
                  </q-btn>
                </div>

                <div class='col-12 q-py-sm q-px-lg'>
                  <q-btn
                    unelevated
                    rounded
                    class="full-width"
                    style="height:50px;"
                    text-color='grey-8'
                    color="white"
                    >
                    <q-icon
                      left
                      name='fas fa-comment-alt' />
                    <q-space />
                    Sign in with mobile number
                    <q-space />
                    </q-btn>
                </div>
                <div class='q-pt-sm' style='color: white;'>
                  <b>Trouble signing in?</b>
                </div>

              </div>

          </q-page>
        </q-page-container>
        </q-layout>

      </div>
    </div>

</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'PageSocialAuth',
  methods: {
    ...mapActions('auth', ['facebookLoginUser', 'googleLoginUser']),
  }
})
</script>

<style lang='sass'>
.q-page
  background: #1A2980  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #26D0CE, #1A2980)  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #26D0CE, #1A2980) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

.fa-google-g-new
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 72% 54%/151% 151% no-repeat
  -webkit-background-clip: text
  background-clip: text
  color: transparent
  -webkit-text-fill-color: transparent



</style>