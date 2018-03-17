<template>
  <div class="vueueChar">
    <div class="row">
      <form class="col s8 offset-s2">
        <div class="row">
          <div class="input-field col s6">
            <input id="full_name" type="text" class="validate" >
            <label for="full_name" class="active">count char</label>
          </div>
        </div>
      </form>
    </div>
    <p v-bind:class="limiterClass"><strong><small>{{ inputLength }} / {{ limit }}</small></strong></p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      required: false,
      default: 160
    },
    input: {
      type: String,
      required: true
    }
  },
  computed: {
    inputLength: function () {
      return this.input.length;
    },
    limiterClass: function () {
      if (this.input.length >= this.limit) {
        return 'text-danger';
      }
      if (this.input.length > 110) {
        return 'text-success';
      }
      if (this.input.length > 80) {
        return 'text-info';
      }
      if (this.input.length > 50) {
        return 'text-muted';
      }
      return 'text-danger';
    }
  }
}
</script>