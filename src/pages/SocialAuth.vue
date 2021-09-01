<template>
    <div class="flex flex-center">
      <div class="q-pr-lg">
        <h4 class='text-center q-pt-sm'>
          Mobile optimized social auth page</h4>
        <div class="text-center">
          <q-btn
            color="red-7"
            @click="alert"
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
                    @click="facebookStub()"
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
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageSocialAuth',
  setup () {
    const $q = useQuasar()

    function alert () {
      $q.dialog({
        title: '<div class="text-center">Tinder sign in</div>',
        message: '<img src="https://i.imgur.com/0rr2hcY.jpg" width="363px" height="620px"/>',
        html: true
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    return { alert }
  },
  methods: {
    ...mapActions('auth', ['facebookLoginUser', 'googleLoginUser']),
    facebookStub() {
      this.$q.dialog({
        title: 'Facebook login',
        message: 'facebook integration is work in progress. Please check google login.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }

})
</script>

<style lang='sass'>
.q-page
  background: #1A2980  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #26D0CE, #1A2980)  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #26D0CE, #1A2980) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

.fa-google-g-new
  -webkit-background-clip: text
  background-clip: text
  color: transparent
  -webkit-text-fill-color: transparent



</style>