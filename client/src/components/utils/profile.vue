<template>
  <div class="user-profile">
    <interface>
      <template slot="basic-details">
        <!-- <basicDetails/> -->
      </template>

      <template slot="side-nav-content">
        <slot name="side-nav-content"></slot>
      </template>

      <template slot="platform-content">
        <slot name="personal-details"></slot>
      </template>
    </interface>
    
    <router-view></router-view>
  </div>
</template>
<script>
import Interface from '@/components/layouts/interface'
import BasicDetails from '@/components/widgets/basicDetails'
// import navs from '@/platform/patientInterface/navs'
export default {
  components: {Interface, BasicDetails}
}
</script>
<style scoped>
#app > div > div > div:nth-child(3) > div:nth-child(2){
  margin-top: 0.6rem;
}
</style>
