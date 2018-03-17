<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import mixins from '@/plugins/mixins'
  export default{
    name: 'app',
    // mixins: [mixins],
    mounted () {
      console.log(JSON.stringify(this.$store.state))
    }
}
</script>

<style>
#app > div > div.update-profile-data > div > form > div:nth-child(1) > div > img, #app > div > div.profileWra > div > div > div.profilePic.col.s3.right > img {
  border-radius: 15px;
}
#app > div > div.profileWra > div > div:nth-child(1) > div.profilePic.col.s3.right {
  margin-top: 2rem;
}
#app > div > div.row.container.blue-grey.white-text.center-align {
    padding: 0.5rem 1.5rem;
    margin-top: 0.3rem;
}
textarea{
  width: 100%;
  height: auto !important;
}
input {
  color: #000 !important;
}
a.btn {
  background-color: #2196f3 !important;
}
::placeholder {
  color: #2196f3 !important;
}
#field2 > small.errorMsg, #field2 > small.successMsg{
  font-size: 0.89rem !important;
  margin: 0 !important; 
  font-weight: 100 !important;
}
#nav-mobile > div > li > a {
    font-size: 0.7rem !important;
}
#drugs > div > div > ul > li > div.collapsible-body > h6{
  font-weight: 400;
}
</style>
