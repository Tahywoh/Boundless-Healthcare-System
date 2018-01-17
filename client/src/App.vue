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
</style>
