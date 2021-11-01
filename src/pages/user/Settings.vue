<template>
  <q-page>

    <div style="width: 30%" class='column inline'>
        <q-separator color='grey-1' size='8px'/>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
            <div class="text-grey-10">@wiktorcc</div>
            <q-space />
        </q-btn>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Account</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Privacy</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
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

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
          <div class="text-grey-10">Display</div>
          <q-space />
          <q-icon
            right
            color='black'
            name='eva-arrow-ios-forward-outline' />
        </q-btn>

        <q-btn outline color='grey-4' size='md'  no-caps class='flex-item text-h5' >
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