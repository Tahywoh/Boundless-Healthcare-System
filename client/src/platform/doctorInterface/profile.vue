<template>
  <div class="patient-profile">
     <fixednav/>
    <div class="row container blue-grey white-text center-align">
          <div class="row">
            <div id="basicDetails" class="left col s7">
              <p class="field left">
                Full Name: <span>Adeshina Taiwo</span>
              </p>
              <p class="field left">
                Email Address: <span>a.taiwoquadri@gmail.com</span>
              </p>
            </div>
            <div class="profilePic right col s5">
              <i class="icon ion-android-contact x35 white-text text-center center-align" style="font-size: 10rem"></i>
            </div>
          </div>
          <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-call"></i>
                <input id="telephone" type="number" class="validate autofocus"  value="08102590790" readonly>
                <label for="telephone">Telephone:</label>
              </div>
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="city" type="text" class="validate"  value="Osogbo" readonly>
              <label for="city">City:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="state" type="text" class="validate"  value="Osun" readonly>
              <label for="state">State:</label>
            </div>
            <div class=" input-field col s6"><br/>
              <input id="specialty" type="text" class="validate"  value="Medical Physiology" readonly>
              <label for="specialty">Specialty:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <input id="hospitalName" type="text" class="validate"  value="Crescent Hospital" readonly>
              <label for="hospitalName">Hospital Name:</label>
            </div>
            <div class=" input-field col s6">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" readonly>NNPC station, Mark ,tanke Ilorin</textarea>
              <label for="address_profile">Hospital Address:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  value="B. sc, Physiology, University of Ilorin Nigeria" readonly>
              <label for="hospitalName">Education Requirements:</label>
            </div>
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  value="International Medical License" readonly>
              <label for="hospitalName">License Requirements:</label>
            </div>
          </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Fixednav from '@/components/layouts/fixednav'
export default {
  components: {Fixednav}
}
</script>

<style scoped>
i.icon.ion-ios-paper{
  margin-left: 5rem;
}
#app > div > div.main-interface > div:nth-child(3) {
    margin-left: 25%;
    display: none;
}
#basicDetails{
  margin-top: 4.5rem;
}
#app > div > div.row.container.blue-grey.white-text.center-align > div {
    padding: 0.1rem 1.5rem;
}
#app > div > div.row.container.blue-grey.white-text.center-align > div > div.input-field.col > label, input :read-only+label, input:not([type]):disabled, input:not([type])[readonly="readonly"], input[type=text]:not(.browser-default):disabled, input[type=text]:not(.browser-default)[readonly="readonly"], input[type=password]:not(.browser-default):disabled, input[type=password]:not(.browser-default)[readonly="readonly"], input[type=email]:not(.browser-default):disabled, input[type=email]:not(.browser-default)[readonly="readonly"], input[type=url]:not(.browser-default):disabled, input[type=url]:not(.browser-default)[readonly="readonly"], input[type=time]:not(.browser-default):disabled, input[type=time]:not(.browser-default)[readonly="readonly"], input[type=date]:not(.browser-default):disabled, input[type=date]:not(.browser-default)[readonly="readonly"], input[type=datetime]:not(.browser-default):disabled, input[type=datetime]:not(.browser-default)[readonly="readonly"], input[type=datetime-local]:not(.browser-default):disabled, input[type=datetime-local]:not(.browser-default)[readonly="readonly"], input[type=tel]:not(.browser-default):disabled, input[type=tel]:not(.browser-default)[readonly="readonly"], input[type=number]:not(.browser-default):disabled, input[type=number]:not(.browser-default)[readonly="readonly"], input[type=search]:not(.browser-default):disabled, input[type=search]:not(.browser-default)[readonly="readonly"], textarea.materialize-textarea:disabled, textarea.materialize-textarea[readonly="readonly"]{
  color: #fff !important;
  font-weight: 500 !important;
  font-size: 15px !important;
}
</style>
