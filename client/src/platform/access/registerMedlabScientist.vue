<template>
  <div class="registration center-align">
    <index>
      <div slot="indexMainContent" class="mainContent center-align">
        <h3 class="blue white-text">Registration</h3>
        <form class="col s6">
          <div id="field1" :class="show">
            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-contact"></i>
                <input  type="text" class="validate">
                <label >Full Name</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-android-mail"></i>
                <input type="email" class="validate">
                <label for="email">Email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-call"></i>
                <input id="telephone" type="tel" class="validate">
                <label for="telephone">Telephone</label>
              </div>
              <div class="input-field col s6">
                <!-- <i class="icon fa-birthday-cake"></i> -->
                <input id="age" type="number" class="validate">
                <label for="age">Age</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-location"></i>
                <input id="city" type="text" class="validate">
                <label for="city">City</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-location"></i>
                <input type="text" class="validate">
                <label for="state">State</label>
              </div>
            </div>            
             <div class="row">
              <div class="input-field col s5">
                <select class="browser-default waves-effect waves-light btn blue" style="class:  browser">
                  <option value="" disabled selected>Select gender</option>
                  <option value="2">Male</option>
                  <option value="3">Female</option>
                </select>
                <label>Gender</label>         
              </div>
              <div class="input-field col s7">
                <i class="icon ion-ios-contact"></i>
                <div class="file-field input-field">
                  <div class="btn bg-for-tab blue">
                  <span>Photo</span>
                  <input required type="file"  name="profilePhoto">
                </div>
                <div class="file-path-wrapper">
                  <input required class="file-path validate" required type="text">
                </div>
                </div>
              </div>
            </div>
          </div>
 

          <div id="field2" style="display: none">
           
            <div class="row">
               <div class="input-field col s6">
                <input id="pharmacy-name" required type="text" class="validate" name="pharmacy-name">
                <label for="pharmacy-address">Laboratory name</label>
              </div>
              <div class="input-field col s6">
                <input id="pharmacy-addressAddress" required type="text" class="validate" name="pharmacy-address">
                <label for="pharmacy-address">Laboratory location</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="icon ion-ios-paper"></i>
                <input id="edu" required type="text" class="validate" name="education">
                <input id="license" required type="text" class="validate" name="license">
                <label for="full_name">Education and Licensing Requirments</label>
              </div>
            </div>
             <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-eye-disabled"></i>
                <input  type="password" class="validate">
                <label >Password</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-eye-disabled"></i>
                <input type="password" class="validate">
                <label for="password">Confirm Password</label>
              </div>
            </div>
          </div>
          <a @click="triggerField2" id="proceedBtn" class="btn blue white-text waves-effect waves-grey right a-f-arrow show" ><i class="icon ion-android-arrow-forward" ></i></a>
           <a @click="triggerField1" class="btn blue white-text waves-effect waves-grey right a-b-arrow blue white-text hide" id="backwordBtn"><i class="icon ion-android-arrow-back" ></i></a>
           <button  class="btn text-center blue submit-btn hide" type="submit" id="submitBtn"
           >Submit</button>
          
      </form>
      </div>
    </index>
    <router-view></router-view>
  </div>
</template>


<script>
import Index from '@/platform/index'
export default {
  name: 'register',
  components: { Index },
  methods: {
    triggerField2 () {
      let field1 = document.getElementById('field1')
      let field2 = document.getElementById('field2')
      let proceedBtn = document.getElementById('proceedBtn')
      let backwordBtn = document.getElementById('backwordBtn')
      let submitButton = document.getElementById('submitBtn')
      field1.style.display = 'none'
      field2.style.display = 'block'
      // proceedBtn.classList.toggle('ion-android-arrow-back ')
      proceedBtn.classList.remove('show')
      proceedBtn.style.display = 'none'
      backwordBtn.classList.add('show')
      submitButton.classList.remove('hide')
    },
    triggerField1 () {
      let field1 = document.getElementById('field1')
      let field2 = document.getElementById('field2')
      let proceedBtn = document.getElementById('proceedBtn')
      let backwordBtn = document.getElementById('backwordBtn')
      let submitButton = document.getElementById('submitBtn')
      field2.style.display = 'none'
      field1.style.display = 'block'
      backwordBtn.classList.remove('show')
      backwordBtn.style.display = 'none'
      proceedBtn.classList.remove('hide')
      proceedBtn.classList.add('show')
      proceedBtn.style.display = 'block'
      submitButton.classList.add('hide')
      // console.log('am working....')
    }
  }
}
</script>

<style>
#field1 > div > div {
    margin: 0.897rem 0 !important;
}
#field2 > div > div {
    margin: 2.5rem 0 !important;
}
i.icon.ion-eye-disabled {
    position: absolute;
    right: 6rem;
}
i.icon.ion-ios-paper{
  position: absolute;
  right: 14rem;
}
div.main img{
  width: 100%;
  filter: brightness(.79) !important;
  z-index: -1;
}
option, option:disabled{
  background-color: gray;
}
.file-field.input-field {
    position: relative;
    margin-top: -0.6rem;
}
label {
    font-weight: 100;
}
i.icon.ion-android-arrow-forward, i.icon.ion-android-arrow-back {
    font-size: 3rem;
    position: absolute;
    right: 0.5rem;
    bottom: -0.29rem;
}
.a-b-arrow{
  left: 23rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a {
    /* font-size: 3rem; */
    position: absolute;
    /* right: 22rem; */
    bottom: 3.5rem;
    border-radius: 50%;
    padding: 0rem 1.5rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a.a-f-arrow{
  right: 26rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a.a-b-arrow {
    left: 26rem;
}
.show{
  display: block !important;
}

.mainContent {
    width: 45%;
    height: 85vh;
    margin: 2rem auto;
    border-radius: 13px;
    border-width: 1px;
    border-style: solid;
    border-color: grey;
    border-image: initial;
    background-color: #fff;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form{
  padding: 0 1rem;
}
input{
  color: #fff !important;
}
#field1 > div > div > i, #field2 > div > div > i {
    color: #2196f3;
}
.mainContent h3 {
    top: 0;
    font-weight: 500;
    margin: 0px auto;
    width: initial;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    padding: 0.8rem 0;
}
select.browser-default.waves-effect.waves-light.btn {
    opacity: 1;
    height: 35px;
    width: 80%;
    top: 2.5rem;
    left: 0.8rem;
    pointer-events: visible !important;
}

</style>
