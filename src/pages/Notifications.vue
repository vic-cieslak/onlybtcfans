<template>
  <q-page>
    <!-- content -->
    <div class="q-pa-md q-gutter-md">

     <q-btn
       flat
       label='all'
       color="grey-7"
       icon="eva-done-all-outline" />

     <q-btn
       flat
       label='interactions'
       color="grey-7"
       icon="eva-message-circle-outline" />

     <q-btn
       flat
       label='liked'
       color="grey-7"
       icon="eva-heart-outline" />

     <q-btn
       flat
       label='subscribed'
       color="grey-7"
       icon="eva-unlock-outline" />

     <q-btn
       flat
       label='tipped'
       color="grey-7"
       icon="monetization_on" />

     <q-btn
       flat
       label='promotions'
       color="grey-7"
       icon="eva-alert-triangle-outline" />

    </div>
    <q-separator />
  </q-page>
</template>

<script>
export default {
  name: 'PageNotifications',
}
</script>
