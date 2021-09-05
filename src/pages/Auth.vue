<template>
  <q-page padding>
    <div class="flex flex-center">
      <img
      alt="casting logo"
      src="~assets/bender.jpeg"
      style="width: 30%; height: 30%"
      >
    </div>

    <h6 class="text-center text-caption">Sign up to earn bitcoin and interact with your fans!</h6>

    <div class="row justify-center">
      <div class='col-12 text-center q-py-sm q-px-lg'>
        <q-btn
          unelevated
          rounded
          class="authentication"
          style="height:50px;"
          text-color='white'
          color="grey-5"
          @click="googleLogin()"
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
    </div>

    <div class="row justify-center">
      <div class='col-12 text-center q-py-sm q-px-lg'>
        <q-btn
          unelevated
          rounded
          class="authentication"
          style="height:50px;"
          text-color='white'
          color="blue-6"
          @click="twitterLogin()"
          >
          <q-icon
            left
            color="white"
            name='fab fa-twitter' />
          <q-space />
          Sign in with Twitter
          <q-space />
        </q-btn>
      </div>
    </div>

    <div class="text-center q-py-sm text-grey-7">OR</div>

    <q-form class="authentication q-gutter-y-md" ref="emailAuthenticationForm" @submit="onSubmit">
      <q-input
        v-model="email"
        name="email"
        outlined="outlined"
        lazy-rules="lazy-rules"
        autocomplete="email"
        color="primary"
        data-cy="email"
        label="EMAIL"
        type="email"
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
      />
      <q-input
        v-model="password"
        lazy-rules="lazy-rules"
        outlined="outlined"
        autocomplete="current-password new-password"
        color="primary"
        data-cy="password"
        label="PASSWORD"
        :rules="[val => !!val || '*Field is required']" :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit(); $event.target.blur()"
      >
        <template v-slot:append>
          <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <p class="q-ma-none text-center" v-if="!isRegistration">
        <router-link class="text-primary" to="forgotPassword">Forgot Password?</router-link>
      </p>

      <q-btn
        class="full-width q-mt-md"
        rounded
        style='height: 50px'
        color="primary"
        data-cy="submit"
        type="submit"
        :label="getAuthType"
      >
      </q-btn>

      <div v-if="isRegistration">
        <p class="q-mt-md q-mb-none text-center">
          By signing up you agree to our <br>
          Terms of Service and Privacy Policy, and confirm that you are at least 18 years old.

        </p>

        <p class="q-mt-md q-mb-none text-center">
          Already have an account?
        </p>
      </div>
      <p class="q-mt-md q-mb-none text-center">
          <router-link class="text-primary text-bold" :to="routeAuthentication">
            <span v-if="isRegistration">Login</span>
            <span v-else>Need to create an account?</span>
          </router-link>
      </p>

    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { QSpinnerGears } from 'quasar'

export default {
  name: 'Auth',
  computed: {
    getAuthType () {
      return this.isRegistration ? 'Register' : 'Login'
    },
    isRegistration () {
      return this.$route.name === 'Register'
    },
    routeAuthentication () {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data () {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    ...mapActions('auth', ['createNewUser', 'loginUser', 'googleLoginUser', 'twitterLoginUser']),
    googleLogin() {
      this.$q.loading.show({
        message: 'Authenticating via Google...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      this.googleLoginUser().catch((error) => {
        this.$q.loading.hide()
      })
    },
    twitterLogin(){
      this.$q.loading.show({
        message: 'Authenticating via Twitter...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      this.twitterLoginUser().catch((error) => {
        this.$q.loading.hide()
      })
    },
    onSubmit () {
      const { email, password } = this
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (success) {
            this.$q.loading.show({
              message: this.isRegistration
                ? 'Registering your account...'
                : 'Authenticating your account...',
              backgroundColor: 'grey',
              spinner: QSpinnerGears,
              customClass: 'loader'
            })
            try {
              if (this.isRegistration) {
                await this.createNewUser({ email, password })
              } else {
                await this.loginUser({ email, password })
              }
              this.$router.push({ path: '/user/profile' })
            } catch (err) {
              console.error(err)
              this.$q.notify({
                message: `An error as occured: ${err}`,
                color: 'negative'
              })
            } finally {
              this.$q.loading.hide()
            }
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.authentication
  margin auto
  max-width 30em
  width 100%
.fa-google-g-new
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 72% 54%/151% 151% no-repeat
  -webkit-background-clip: text
  color: transparent
  -webkit-text-fill-color: transparent

</style>
