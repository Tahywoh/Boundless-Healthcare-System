<template>
  <div class="testingUpload">
    <file-upload :url='url' :thumb-url='thumbUrl' :headers="headers" @change="onFileChange" @submit="mySaveMethod"></file-upload>
    <div><img src="../../assets/platform/2017-03-09-09-31-31-900x598.jpg" alt="checkme" class="responsive-img"></div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import Vue from 'vue'
import FileUpload from 'v-file-upload'
Vue.use(FileUpload)
// import { FileUploadService } from 'v-file-upload'
export default {
  data () {
    return {
      url: 'http://localhost:1050/handlePhoto/imgUpload',
      headers: {'access-token': `${this.$store.state.token}`},
      filesUploaded: []
    }
  },
  methods: {
    thumbUrl (file) {
      // console.log(JSON.stringify(file))
      return file
    },
    onFileChange (file) {
      // Handle files like:
      console.log(this.filesUploaded)
      console.log(this.file)
      this.fileUploaded = file
    },
    mySaveMethod (file) {
      let fileUpload = new FileUpload(
        this.url,
        this.headers,
        this.onProgress
      )
      fileUpload
        .upload(file, { doc_id: 1 })
        .then(e => {
          console.log(JSON.stringify(e))
          // Handle success
          alert('Upload is a success!')
        })
        .catch(e => {
          // Handle error
          console.log(JSON.stringify(e))
        })
    }
  }
}
</script> 