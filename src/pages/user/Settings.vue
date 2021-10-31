<template>
  <q-page>

    <div style="width: 30%" class='column inline'>
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

        <q-btn outline size='md'  no-caps class='flex-item text-h5' >
            What's new
            <q-space />
            <q-icon
              right
              name='eva-arrow-ios-forward-outline' />
        </q-btn>
    </div>

    <div class='column inline'>

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