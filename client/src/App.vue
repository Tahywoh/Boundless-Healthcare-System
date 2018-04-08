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
      // console.log(JSON.stringify(this.$store.state))
    }
}
</script>
<style>
  #sideMenu > i {
    margin-left: -2.5rem;
  }
.tabs .indicator {
  background-color: transparent !important;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form {
  padding: 1.3rem !important;
}
div[class$="profile"] label.active, #app > div > div.profileWra  label.active {
    font-weight: 500 !important;
    color: #fff !important;
}
nav ul a.btn.transparent.white-text.waves-effect.waves-light {
    font-size: 0.7rem;
}
#nav-mobile > div > li > a {
  font-size: 0.7rem !important;
}
.btn, .btn-large, .btn-flat {
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 1rem;
    text-transform: uppercase;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
}
#app > div > div > div.content.row > div > div.side-nav-content.col.m7.s12 > a {
  width: max-content;
}
nav ul a.btn, nav ul a.btn-large, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 11px;
}
#app > div > div.update-profile-data > h5 {
    font-weight: 500;
    color: #2196f3;
}
#app > div > div.profileWra > h5 {
    font-weight: 500;
    background-color: #2196f3;
    padding: 0.5rem;
    width: 100%;
}
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
#drugs > div > div > ul > li > div.collapsible-body > h6{
  font-weight: 400;
}
</style>
