<template>
  <div class="globalMedicalRecord">
    <div class="patientData">
      <h5 class="text-center center-align x2">Patient Medical Record</h5>
      <div class="row">
        <div class="col s12 m8 offset-m2" style="font-family: segoe UI;">
          <div class="row">
             <div class="input-field col m7 s12" style="margin-top: 3.5rem;">
                <h5>{{this.$store.state.profile.fullName}}</h5>
            </div>
            <div class="col m3 s12 offset-m1">
              <img src="../../assets/platform/mygpix.png" alt="user photo" class="responsive-img circle" width="100px" height="100px">
            </div>
            <br/> 
            <div class="col s12">
              <div class="card grey lighten-4 grey-text text-darken-4 animated lightSpeedIn">
                <div class="card-content">
                  <span class="disease x15">Disease</span>
                  <span class="card-title">Fever</span>
                  <br/>
                  <div class="divider"></div>
                 <span class="disease x15">Description</span> <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                  <br/>
                  <div class="divider"></div>
                 <span class="prescribed-drug x15">Prescribed Drugs</span>
                 <p>
                   <br/>
                  <small class="btn blue">Durg Name</small>&nbsp;Loratidine.<br/><br/>
                  <small class="btn blue">Quantity</small>&nbsp;3 per day.
                  <small class="btn blue">Duration</small>&nbsp;30 days.<br/>
                 </p>
                 <br/>
                 <div class="divider"></div>
                 <span class="laboratory-report x15">Summary of laboratory reports</span> <p>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aliquam ipsa, voluptatibus veniam iste molestiae iusto beatae facere fugit rerum doloribus architecto, dolore id necessitatibus alias assumenda laboriosam, fugiat deleniti!
                 </p>
                 <br/>
                 <div class="divider"></div>
                 <a class="attendedDoc x15">Doctor:</a>&nbsp;&nbsp;Dr. Zayd<br/><br/>
                 <div class="divider"></div>
                 <br/>
                 <small class="btn-small blue">Date: </small><small class="amber-text text-lighten-1">&nbsp;&nbsp;&nbsp;2018-04-05T00:00:00.000Z</small>
                </div>
                <div class="card-action">
                  <a class="btn blue waves-effect">Edit record</a>
                  <a class="btn blue waves-effect">Remove record</a>
                </div>
              </div>
              <div class="card-action addToRecord">
                  <a  class="btn waves-effect right">
          Add record</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
div.globalMedicalRecord > div > div > div {
  border: 4px groove sandybrown;
}
</style>
