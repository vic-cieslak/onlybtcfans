<template>
  <q-page>
  <div class="row items-start">

    <q-card flat bordered class="my-card" v-for='i in 10'>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Wiktorero </q-item-label>
          <q-item-label caption>@wiktorcc</q-item-label>
        </q-item-section>

        <q-item-section align='right'>
          <q-item-label caption>8 hours ago <q-btn size='md' flat dense icon='eva-more-horizontal-outline'></q-btn> </q-item-label>
        </q-item-section>

      </q-item>
      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
      <img src="https://cdn.quasar.dev/img/parallax2.jpg">

      <q-card-actions class="justify-start">
        <q-btn flat round color="grey-8" icon="favorite" />
        <q-btn flat round color="grey-8" icon="eva-message-circle-outline" />
        <q-btn flat rounded color="grey-8" icon="o_paid" dense label='Send tip'/>
        <q-btn  flat rounded color="grey-8" icon="bookmark" />
      </q-card-actions>

      <q-card-actions class="justify-start q-pl-md q-pb-md">
        <div class='q-pr-sm'>39 likes</div>
        <span class="dot"></span>
        <div class='q-pl-sm'>7 comments</div>
      </q-card-actions>

    </q-card>

  </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageFeed',

  setup () {
    return {
      lorem: 'Happy Halloween 🎃 Joker/HatsuneMiku Who did you go as?'
    }
  }
}
</script>

<style lang="sass" scoped>
.dot
  height: 4px
  width: 4px
  background-color: grey
  border-radius: 50%
  display: inline-block

.my-card
  width: 100%
</style>