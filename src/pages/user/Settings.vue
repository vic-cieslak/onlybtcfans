<template>
  <q-page class='fit row reverse wrap justify-start'>
    <div class='column col-grow' style="overflow: auto; width: 600px;">
      <router-view />
    </div>

    <div style="overflow: auto; width: 300px;" class='column inline col-grow'>
        <q-separator color='grey-1' size='8px'/>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
            <div class="text-grey-10">@wiktorcc</div>
            <q-space />
        </q-btn>

        <q-btn :to="{name: 'SettingsProfile'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Profile</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn :to="{name: 'SettingsAccount'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Account</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn :to="{name: 'SettingsPrivacy'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Privacy</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn :to="{name: 'SettingsNotifications'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Notifications</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-separator color='grey-1' size='8px'/>

        <q-btn outline color='grey-4' size='md' no-caps class='flex-item' >
          <div class="text-grey-10">General</div>
            <q-space />

        </q-btn>

        <q-btn :to="{name: 'SettingsDisplay'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Display</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn :to="{name: 'SettingsNewFeatures'}" outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">What's new</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <!-- <q-btn
          disabled
          style='height: 200px;'
          outline
          color='grey-4'
          size='md'
          no-caps
          class='flex-item text-h5 no-pointer-events'>
          <div class="text-grey-10"></div>
          <q-space />
        </q-btn> -->

    </div>


  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UserSettings',
  setup () {
    return {
      tab: ref('profile'),
    }
  }
}
</script>