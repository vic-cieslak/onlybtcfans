<template>
  <q-page>

    <div style='width:30%;' class='column'>
        <q-separator color='grey-1' size='8px'/>

        <q-btn size='md' color="white" no-caps class='flex-item text-h5' text-color="black" >
            @wiktorcc
            <q-space />
        </q-btn>

        <q-btn size='md' color="white" no-caps class='flex-item text-h5' text-color="black" >
            Account
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn size='md' color="white" no-caps class='flex-item text-h5' text-color="black" >
            Privacy
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn size='md' color="white" no-caps class='flex-item text-h5' text-color="black" >
            Notifications
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-separator color='grey-1' size='8px'/>

        <q-btn size='md' color="white" no-caps class='flex-item' text-color="black" >
            General
            <q-space />
        </q-btn>

        <q-btn size='md' color="white" no-caps class='flex-item text-h5' text-color="black" >
            Display
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn outline size='md' color="purple"  no-caps class='flex-item text-h5' >
            What's new
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>



          <!-- <q-tabs
            v-model="tab"
            vertical
            inline-label
            no-caps
            class='q-pl-sm'
          >
            <q-route-tab name="@wiktorcc" label="@wiktorcc" style="justify-content:initial"/>
            <q-route-tab name="profile" label="Profile" style="justify-content:initial"/>
            <q-route-tab name="account" label="Account" style="justify-content:initial"/>
            <q-route-tab name="privacy" label="Privacy and safety" style="justify-content:initial"/>
            <q-route-tab name="notifications" label="Notifications" style="justify-content:initial"/>

            <q-separator size='8px' width='200px'/>
            <div class='q-pl-sm text-bold'>General</div>
            <q-separator size='8px' width='200px'/>

            <q-route-tab name="display" label="Display" style="justify-content:initial"/>
            <q-route-tab name="new_features" label="What's new" style="justify-content:initial"/>


          </q-tabs> -->

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