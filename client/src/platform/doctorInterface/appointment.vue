<template>
  <div class="doctorAppointment">
    <doctor-appointment/>
    <router-view></router-view>
  </div>
</template>

<script>
  import DoctorAppointment from '@/components/features/appointment'
  export default {
    components: {DoctorAppointment}
  }
</script>
