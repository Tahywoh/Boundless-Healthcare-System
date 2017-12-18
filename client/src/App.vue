<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style>
::placeholder {
  color: #2196f3 !important;
}
#field2 > small.errorMsg, #field2 > small.successMsg{
  font-size: 0.89rem !important;
  margin: 0 !important; 
  font-weight: 100 !important;
}
</style>
