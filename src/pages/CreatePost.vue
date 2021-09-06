<template>
  <q-page>
    <q-input
      class='q-pl-lg'
      v-model="text"
      autogrow
      :input-style="{'font-size': '18px'}"
      borderless
      placeholder="Compose new post..."
    />



    <div class="q-pa-md">



    <!-- @uploaded="uploadComplete" -->

    <PostPhotoUploader
      label="Custom header"
      multiple
      class='full-width bg-grey-1'
      color="primary"
      square
      :meta="meta"
      :prefixPath="prefixPath"
      auto-upload
      accept=".jpg, image/*"
      flat
      style="max-width: 300px"
    >


      <template v-slot:header="scope" >
        <div class="row no-wrap items-center q-pa-none q-gutter-xs bg-grey-1">
          <q-btn
            v-if="scope.canAddFiles"
            type="a"
            color='grey-6'
            class='q-ml-xs'
            icon="eva-image-outline"
            round
            dense
            flat>
            <q-uploader-add-trigger />
            <q-tooltip>Add Files</q-tooltip>
          </q-btn>
          <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
            <q-tooltip>Remove Uploaded Files</q-tooltip>
          </q-btn>
          <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />

          <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
            <q-tooltip>Abort Upload</q-tooltip>
          </q-btn>
        </div>
      </template>


      <template v-slot:list="scope" >

          <q-scroll-area style="height: 200px; " class='full-width'>
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">

              <template v-for="file in scope.files" :key="file.name">
                <q-img
                  class="rounded-borders col-3 full-height"
                  :src="file.__img.src"
                  width='200px'
                  >

                  <q-btn
                    class="float-right all-pointer-events"
                    size="lg"
                    flat
                    dense
                    round
                    color='primary'
                    icon="eva-close-circle"
                    @click='scope.removeThisFile(file)'
                  />
                </q-img>

              </template>

            </div>
          </q-scroll-area>


      </template>
    </PostPhotoUploader>
  </div>


  </q-page>
</template>

<script>
import { ref } from 'vue'
import PostPhotoUploader from '../components/PostPhotoUploader.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PageCreatePost',
  components: {
    PostPhotoUploader
  },
  setup () {
    return {
      slide: ref(1),
      text: ref('')
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
        // photoType: this.photoType
      }
    },
    prefixPath () {
      const id = this.currentUser.id,
        path = `posts/${id}/${this.photoType}Photo/`
      return path
    }
  },
}
</script>
