<template>
  <div class="patientAppointment">
    <patient-appointment/>
    <router-view></router-view>
  </div>
</template>

<script>
  import PatientAppointment from '@/components/features/appointment'

  export default {
    components: {PatientAppointment}
  }
</script>
