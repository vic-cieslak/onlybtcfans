<script>

import { createUploaderComponent } from 'quasar'
import { computed } from 'vue'

export default createUploaderComponent({

  name: 'FirebaseUploader',

  props: {
    meta: {
      type: Object
    },
    prefixPath: {
      type: String
    }
  },
  emits: [
    // ...your custom events name list
  ],

  data () {
    return {
      uploading: false,
      filesUploading: []
    }
  },

  injectPlugin ({ props, emit, helpers }) {
    // can call any other composables here
    // as this function will run in the component's setup()

    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = computed(() => {
      return this.uploading
    })

    // [ optional ]
    // Shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    const isBusy = computed(() => {
      return this.uploading
    })

    // [ REQUIRED! ]
    // Abort and clean up any process
    // that is in progress
    function abort () {
      // ...
    }

    function updateComponent (index, snapshot, status = 'uploading') {
      const file = this.files[index],
        uploadSize = (typeof snapshot === 'object') ? snapshot.bytesTransferred : 0

      // QUploaderBase private method to update file progress
      this.__updateFile(file, status, uploadSize)
    }

    function uploadFileToFirestore (file) {
      const { meta } = this,
        { docRef, storageRef } = this.$fb,
        index = this.filesUploading.length,
        fileSuffix = file.type.split('/')[1],
        uploadImageStorageRef = storageRef(`${this.prefixPath}${fileSuffix}`),
        profileImageStorageRef = uploadImageStorageRef.put(file),
        STATE_CHANGED = this.$fb.self().storage.TaskEvent.STATE_CHANGED

      return new Promise((resolve, reject) => {
        // Firebase UploadTask Event
        profileImageStorageRef.on(
          STATE_CHANGED,
          (snapshot) => {
            updateComponent(index, snapshot)
          },
          (err) => {
            this.$q.notify({
              color: 'negative',
              message: `There was a problem with the upload. ${err}`
            })
            updateComponent(index, 0, 'failed')
            reject()
          },
          () => {
            this.uploadedFiles = this.uploadedFiles.concat(this.files)
            this.queuedFiles = []
            this.filesUploading = []
            this.files.forEach(async file => {
              updateComponent(index, 0, 'uploaded')
              const link = await profileImageStorageRef.snapshot.ref.getDownloadURL()
              docRef('users', meta.id).update({ [`${meta.photoType}Photo`]: link })
              this.$emit('uploaded', { files: [file.name] })
            })
            resolve()
          }
        )
      })
    }

    // [ REQUIRED! ]
    // Start the uploading process
    function upload () {
      if (this.canUpload === false) {
        return
      }

      this.uploading = true
      this.queuedFiles.forEach(file => {
        this.filesUploading.push(uploadFileToFirestore(file))
      })

      Promise.all(this.filesUploading)
        .then(() => {
          this.uploading = false
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            message: `One or more of your files failed to upload. ${err}`
          })
        })
        .finally(() => {
          this.reset()
          this.filesUploading = []
        })
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload
    }
  }
})
</script>

