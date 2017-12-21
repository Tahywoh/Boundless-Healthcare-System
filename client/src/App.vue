<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  name: 'app',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.commit('setUser', {user: null, userType: null})
      this.$router.push({
        name: 'BHCS || Home'
      })
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
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
</style>
