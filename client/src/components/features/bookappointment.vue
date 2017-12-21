<template>
  <div class="book-appointment">
    <modal>
     
      <div slot="triggerModal">
          <slot name="appointmentTrigger">
             Book Appointment
          </slot>
       
        </div>
     
       <template slot="modal-title">Book Appointment</template>
    <template slot="modal-content">
      <div class="row">
      <form class="col s12">
         <div class="row">
          <div class="input-field col s6">
            <input id="title" type="text" data-length="10">
            <label for="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
          <textarea id="reason" class="materialize-textarea"></textarea>
          <label for="reason">Reason</label>
        </div>
        </div>
         <div class="row">
          <div class="input-field col s6">
            <input id="doctor" type="text" data-length="10">
            <label for="doctor">Doctor</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <input type="text" class="timepicker" id="startTime">
            <label for="startTime">Start</label>
          </div>
          <div class="input-field col s6">
             <input type="text" class="timepicker" id="endTime">
            <label for="endTime">End</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <input type="text" class="datepicker" id="date">
            <label for="date">Date</label>
          </div>
        </div>
       
       
        
      </form>
    </div>
    </template>
    </modal>
    <router-view></router-view>
  </div>
</template>
  
<script>
  import Modal from '@/components/snippets/modal'
  export default {
    name: 'modal',
    comments: {Modal}
  }
</script>