<template>
  <div class="dropform" :style="dropformstyle">
        <!-- <i class="icon ion-close" @click="closeUploader" /> -->
        <p v-if="isSaving" class="center center-align">
          <i class="fa fa-spinner fa-pulse"></i> <br>
          <span>Uploading your image</span>
        </p>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || uploadError">
    <div>
      <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
        <p v-if="isInitial">
          Drag your file here to begin<br> or click to browse
        </p>
        <p v-if="isFailed" class="red-text">
          An Error Occoured<br>Please reupload
        </p>
        <!-- <i class="icon ion-upload" /> -->
      </div>
    </form>
    <div class="uploaded-image" :style="{ 'background-image': 'url(' + imgUrl + ')' }" v-if="isSuccess">
      
      <!-- <i class="icon ion-eye" /> -->

    </div>
    <br>
    <br>
    <br>
    <autocomplete
    :url="url"
    anchor="title"
    label="writer"
    :onSelect="getData"
  >
  </autocomplete>
    <div class="succeed" v-if="isSuccess">
        <img :src="imgUrl" alt="Error displaying image, unable to upload image" class="responsive-img">
      </div>



  </div>
</template>

<script>
// import {upload} from '@/services/upload'
import * as axios from 'axios'
import Autocomplete from 'vue2-autocomplete-js'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  components: {Autocomplete},
  props: {
    id: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      url: `http://localhost:8050/search/getAllDocs`,
      data: {
        'Apple': 'apple',
        'Microsoft': 'microsoft',
        'Google': 'https://placehold.it/250x250'
      },
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      imgUrl: ''
    }
  },
  methods: {
    getData (data) {
      console.log(data)
      return data
    },
    toValidUrl (url) {
      let newurl = url.split('//')[0] + '/'
      let newurl2 = url.split('//')[1]
      let obtained = []
      obtained.push(newurl)
      let capitalizeVal = newurl2.split('/')
      capitalizeVal.forEach(word => {
        let newWord = word.split('')
        newWord[0] = '/' + newWord[0]
        newWord = newWord.join('')
        obtained.push(newWord)
      })
      // console.log(obtained.join('/'))
      url = obtained.join('/')
      console.log(url)
      return url
    },
    upload (formData) {
      const url = `http://localhost:8050/handlePhoto/imgUpload`
      return axios.post(url, formData)
      // get data
        .then((x) => {
          if (x) {
            this.imgUrl = this.toValidUrl(x.data)
            console.log(x.data)
            return x.data
          }
        })
      // // add url field
      //     .then(x => x.map(img => Object.assign({},
      //       img, { url: `http:localhost:8050/public/uploads/${img.id}` })))
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      this.upload(formData)
        .then(x => {
          this.imgUrl = x.data
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
          this.$eventBus.$emit('img-uploaded', {
            index: this.id,
            url: x.data
          })
        })
        .catch(err => {
          console.log(err)
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    },
    closeUploader () {
      // if (this.imgUrl.length > 0) {
      //   this.$eventBus.$emit('delete-image-url')
      // }
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    dropformstyle () {
      if (!this.isSuccess) {
        return {outline: '2px dashed grey'}
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style lang="scss" scoped>
.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
.dropform {
  box-shadow: 0 1px 1px;
  outline-offset: -10px;
  background: #f9f9f9;
  color: dimgray;
  padding: 10px 10px;
  height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
  i.ion-upload {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #a4a0a091;
    opacity: 0;
    transition: opacity .2s ease-in-out;

  }
  &:hover {
    i.ion-upload {
      opacity: 1;
    }
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  p {
    text-align: center;
    padding: 50px 29px;
    font-size: .9rem;
  }
  .uploaded-image {
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    i.icon {
      opacity: 0;
      transition: all .2s ease-in;
      font-size: 2rem;
      &:hover {
        color: lightblue;
      }
    }
    &:hover {
      i.icon {
        opacity: 1;
      }
    }
  }
}

</style>
