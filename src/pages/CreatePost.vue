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


    <PostPhotoUploader
      label="Custom header"
      @uploaded="addUrlToPostData"
      multiple
      class='bg-white full-width'
      color="primary"
      square
      :meta="meta"
      :prefixPath="prefixPath"
      auto-upload
      accept=".jpg, image/*, video/*"
      flat
    >

      <template v-slot:header="scope">
        <div class="row no-wrap items-center q-pa-none q-gutter-xs bg-white">
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


      <template v-slot:list="scope">
        <q-linear-progress
          v-if='scope.canUpload'
          :value="scope.uploadProgressLabel"
          class="q-my-md" />

        <q-scroll-area style="height: 250px" >
          <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">

            <template v-for="file in scope.files" :key="file.name">

              <!-- bad code ahead  -->
              <q-img
                class="rounded-borders col-3 full-height"
                v-if="file.__img"
                :src="file.__img.src"
                width=200
                >

                <q-btn
                  class="float-right all-pointer-events"
                  size="lg"
                  flat
                  dense
                  round
                  color='primary'
                  icon="eva-close-circle"
                  @click='removeFile(scope, file)'
                />

              </q-img>

              <q-img
                class="rounded-borders col-3 full-height"
                v-else
                src="~assets/Video-Placeholder.png"
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
              <!-- bad code ends  -->

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
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'PageCreatePost',
  components: {
    PostPhotoUploader
  },
  setup () {
    return {
      slide: ref(1),
      text: ref(''),
      post_id: uuidv4(),
      media_urls: []
    }
  },
  methods: {
    addUrlToPostData(response) {
      console.log(response)
      this.media_urls.push(response['downloadURL'])
    },
    addPost() {
      // todo add to feeds
      console.log(this.text)
      console.log(this.post_id)
      console.log(this.media_urls)
    },
    removeFile(scope, file) {
      // TODO remote remove from firebase storage
      var index = this.media_urls.indexOf(file.__firebaseURL);
      if (index !== -1) {
        this.media_urls.splice(index, 1);
      }
      scope.removeThisFile(file)
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
        path = `posts/${id}/${this.post_id}/`
      return path
    }
  },
}
</script>
