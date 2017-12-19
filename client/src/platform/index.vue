<template>
 <div id="index">
   <!-- TODO: nav section of the index -->

<div class="header-view">
     <navbar/>
</div>
  <div class="main  flow-text">
    <heading/>
    <img src="../assets/platform/39426628-medical-equipment-stethoscope-ampoules-and-syringe-on-white-background-Stock-Photo.jpg" alt="Error displaying image"/>
    <div class="content center-align white-text">
      
      
      <div class="animated bounceInRight"><slot name="indexMainContent" class="animated bounceInRight">
        
      <p>Diagnose your health condition and take necessary measure!</p>
      <p>We offer the best health care system</p>
      <p class="footnote">
          Do you feel pain in any part of your body?<br/>
          Kindly register  at the top right corner of the app to consult doctor
        </p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p class="register-note x15">
          Are you a licensed doctor, pharmacist or medical lab scientist?<br/>
        Kindly register as one to supply the  sick with appropriate drugs, consult a reliable medical test and give the patient the best as regards their health conditions</p>
      </slot>
        
      </div>
    </div>
  </div>
  <router-view></router-view>
 </div>
</template>
<script>
import navbar from '@/components/layouts/navbar'
import Heading from '@/components/layouts/Heading'
export default {
  components: {
    navbar, Heading
  },
  name: 'index'
}
</script>

<style> 
.showcontent{
  display: block !important;
}
div.main{
  width: 100%;
  height: 80vh;
}
div.main img{
  width: 100%;
  filter: brightness(.3);
  z-index: -1;
}
#index > div > div.content {
    position: absolute;
    /* top: 318px; */
    top: 12.99rem;
    right: 0;
    left: 0;
    color: #fff !important;
    font-weight: 600;
}
div.main p.register-note{
  font-weight: 300;
}

/* access styling form */
button#submitBtn {
    margin-top: 1rem;
    border-radius: 15px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 9px 3px -3px rgba(0,0,0,0.42), 0 1px 5px 0 rgba(0,0,0,0.2);
}
form input{
  color: #424242 !important;
}
.row{
  margin-bottom: 4px;
}
#field1 > div > div{
  margin: 0.2rem 0;
}
#field2 i.icon.ion-ios-paper{
  top: -1.5rem; 
}
</style>