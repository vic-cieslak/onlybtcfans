<script>
import { createUploaderComponent } from "quasar";
import { computed, ref } from "vue";
import firebase from "firebase/app";
import { docRef } from '../services/firebase/db.js'
import { v4 as uuidv4 } from 'uuid';

// export a Vue component
export default createUploaderComponent({
  // defining the QUploader plugin here

  name: "PostPhotoUploader", // your component's name

  props: {
    meta: {
      type: Object
    },
    prefixPath: {
      type: String,
      default: "",
    },
  },

  emits: ["uploaded", "failed", "removed"],

  injectPlugin({ props, emit, helpers }) {
    // can call any other composables here
    // as this function will run in the component's setup()
    const storage = ref(firebase.storage().ref());
    const activeTasks = ref([]);
    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = computed(() => {
      // return <Boolean>
    });

    // [ optional ]
    // Shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    const isBusy = computed(() => {
      // return <Boolean>
    });

    // [ REQUIRED! ]
    // Abort and clean up any process
    // that is in progress
    function abort() {
      // ...
    }

    // [ REQUIRED! ]
    // Start the uploading process
    function upload() {
      if (props.disable || !helpers.queuedFiles.value.length) {
        return;
      }
      helpers.queuedFiles.value.forEach(async (file) => {
        await __uploadSingleFile(file);
      });
    }
    function __uploadSingleFile(file) {
      let prefixPath = props.prefixPath || "";
      let fileSuffix = file.type.split('/')[1]
      let photo_id = uuidv4()
      const fileRef = storage.value.child(`${prefixPath}/${photo_id}.${fileSuffix}`);

      helpers.updateFileStatus(file, "uploading", 0);
      const uploadTask = fileRef.put(file);
      activeTasks.value.push(uploadTask);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          if (file.__status !== "failed") {
            const loaded = Math.min(
              snapshot.totalBytes,
              snapshot.bytesTransferred
            );
            helpers.uploadedSize.value += loaded - file.__uploaded;

            helpers.updateFileStatus(file, "uploading", loaded);
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          helpers.queuedFiles.value.push(file);
          helpers.updateFileStatus(file, "failed");
          emit("failed", { file, error });
          helpers.uploadedSize.value -= file.__uploaded;
          activeTasks.value = activeTasks.value.filter((t) => t !== uploadTask);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              docRef('users', props.meta.id).update({ [`${props.meta.photoType}Photo`]: downloadURL })
              console.log(downloadURL)
              file.__firebaseURL = downloadURL
              emit("uploaded", { downloadURL } )
            })
            .catch((error) => {
              emit("failed", { file, error });
            });
          activeTasks.value = activeTasks.value.filter((t) => t !== uploadTask);
        }
      );
    }
    function removeThisFile(file) {

      if (props.disable) {
        return;
      }

      if (file.__status === "uploaded") {
        helpers.uploadedFiles.value = helpers.uploadedFiles.value.filter(
          (f) => f.name !== file.name
        );

        // As of Quasar v2 beta7 uploadSize cannot be taken out of helpers/state.
        // So removeFile won't be able to change blue header the label on top.
        helpers.uploadSize.value -= file.__uploaded;

      } else if (file.__status === "uploading") { // this case not handled atm
        // file.__abort();
        // todo abort should do something here
        console.log('aborting')
      } else {
        helper.uploadSize.value -= file.size;
      }

      helpers.files.value = helpers.files.value.filter((f) => {
        if (f.name !== file.name) {
          return true;
        }

        f._img !== void 0 && window.URL.revokeObjectURL(f._img.src);

        return false;
      });
      helpers.queuedFiles.value = helpers.queuedFiles.value.filter(
        (f) => f.name !== file.name
      );
      emit("removed", [file]);
    }

    return {
      isUploading,
      isBusy,
      removeThisFile,
      abort,
      upload,
    };
  },
});
</script>

