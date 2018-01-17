<template>
    <div id="getPhoto">
        <header class="navbar">
      <span class="navbar-text"> Image moderation with VueJs, NodeJs and
        <a href="">Sightengine</a>
      </span>
        </header>

        <div class="container">
            <img :src="imageSrc" class="image">
            <input @change="uploadImage" type="file" name="photo" accept="image/*">
        </div>
    </div>
</template>

<script>
import Api from '@/services/api'
export default {
  name: 'app',
  data () {
    return {
      imageSrc: ''
    }
  },
  methods: {
    uploadImage (e) {
      var files = e.target.files
      if (!files[0]) {
        return
      }
      var data = new FormData()
      data.append('media', files[0])
      var reader = new FileReader()
      reader.onload = (e) => {
        this.imageSrc = e.target.result
      }
      // reader.readAsDataURL(files[0])
      Api().post('/handlePhotos/uploads', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // reader.readAsDataURL(files[0])
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  
.image {
  width: 100%;
  height: 100%;
}
.container {
  margin: 0 auto;
  width: 600px;
}
.navbar {
  width: 100%;
  cursor: default;
  background-color: #2CA8E5;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 35px;
  margin-bottom:50px;
}
.navbar-text {
  color: white;
  font-weight: bold;
}
.navbar-text a {
  color: white;
}
</style>