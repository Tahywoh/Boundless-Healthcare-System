<template>
  <div class="medicalLabAppointment">
    <lab-appointment/>
    <router-view></router-view>
  </div>
</template>

<script>
import LabAppointment from '@/components/features/appointment'
export default {
  components: {LabAppointment}
}
</script>
