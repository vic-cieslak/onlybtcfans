<script>
import { createUploaderComponent } from "quasar";
import { computed, ref } from "vue";
import firebase from "firebase/app";

// export a Vue component
export default createUploaderComponent({
  // defining the QUploader plugin here

  name: "MyUploader", // your component's name

  props: {
    pathPrefix: {
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
      let pathPrefix = props.pathPrefix || "";
      // const fileRef = storage.value.child(pathPrefix + file.name)
      const fileRef = storage.value.child(`${pathPrefix}/${file.name}`);
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
              const fullPath = uploadTask.snapshot.ref.fullPath;
              const fileName = uploadTask.snapshot.ref.name;
              helpers.uploadedFiles.value.push(file);
              helpers.updateFileStatus(file, "uploaded");
              let uploadTime = _.round(new Date().getTime() / 1000);
              console.log("TCL: __uploadSingleFile -> uploadTime", uploadTime);
              let [fileSize, fileType] = [file.size, file.type];
              console.log(
                downloadURL,
                fileName,
                fileSize,
                fileType,
                fullPath,
                uploadTime
              );
              emit("uploaded", {
                downloadURL,
                fileName,
                fileSize,
                fileType,
                fullPath,
                uploadTime,
              });
              helpers.uploadedSize.value += file.size - file.__uploaded;
              // helpers.uploadedSize.value = 0;
            })
            .catch((error) => {
              emit("failed", { file, error });
            });
          activeTasks.value = activeTasks.value.filter((t) => t !== uploadTask);
        }
      );
    }

    function removeFile(file) {
      if (props.disable) {
        return;
      }

      if (file.__status === "uploaded") {
        helpers.uploadedFiles.value = helpers.uploadedFiles.value.filter(
          (f) => f.name !== file.name
        );

        // As of Quasar v2 beta7 uploadSize cannot be taken out of helpers/state. So removeFile won't be able to change blue header the label on top.
        helpers.uploadSize.value -= file.__uploaded;
      } else if (file.__status === "uploading") {
        file.__abort();
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

      abort,
      upload,
    };
  },
});
</script>

