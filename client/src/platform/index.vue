<template>
 <div id="index" >
   <!-- TODO: nav section of the index -->

<div class="header-view">
  <navbar/>
</div>
  <div class="main flow-text wrapper" style="padding-top:0rem">
    <heading/>
    <div class="homeContent">
        <img src="../assets/platform/newmed.png" alt="Error displaying image" class="img responsive-img"/>
        <!-- <div class="content center-align white-text"> 
          <div class="animated bounceInRight">
            <slot name="indexMainContent" class="animated bounceInRight m6 s12">
          <p>Diagnose your health condition and take necessary measure!</p>
          <p>We offer the best health care system</p>
          <p class="footnote">
            Do you feel pain in any part of your body?<br/>
            Kindly register  at the top right corner of the app to consult doctor
          </p>
          <p class="register-note x15">
              Are you a licensed doctor, pharmacist or medical lab scientist?<br/>
            Kindly register as one to supply the  sick with appropriate drugs, conduct a reliable medical test and give the patient the best as regards their health conditions.</p>
          </slot> 
          </div>
        </div> -->
        <img src="../assets/platform/natanael-melchor-465383 (1).jpg" alt="error displaying image" class="img responsive-img hide-on-large-only">
        <img src="../assets/platform/medlab2.jpg" alt="error displaying image" class="img responsive-img hide-on-med-and-up">
    </div>

    <div class="content center-align white-text" style="margin-left: 0%;"> 
      <div class="animated bounceInRight">
        <slot name="indexMainContent" class="animated bounceInRight m6 s12">
      <p>Diagnose your health condition and take necessary measure!</p>
      <p>We offer the best health care system</p>
      <p class="footnote">
        Do you feel pain in any part of your body?<br/>
        Kindly register  at the top right corner of the app to consult doctor
      </p>
      <p class="register-note x15 white blue-text animate slideInLeft">
          Are you a licensed doctor, pharmacist or medical lab scientist?<br/>
        Kindly register as one to supply the  sick with appropriate drugs, conduct a reliable medical test and give the patient the best as regards their health conditions.</p>
      </slot> 
      </div>
    </div>
  </div>
  <footer-page/>
  <router-view></router-view>
 </div>
</template>
<script>
import navbar from '@/components/layouts/navbar'
import Heading from '@/components/layouts/Heading'
import FooterPage from '@/components/layouts/footer-page'
export default {
  components: {
    navbar, Heading, FooterPage
  },
  name: 'index'
}
</script>
<style> 
#nav-mobile > li > a {
  font-size: 1rem !important;
  padding: 0 1rem !important;
}
.showcontent{
  display: block !important;
}
div.main{
  width: 100%;
  padding-top: 0.3rem;
  /* height: 80vh; */
}
div.main img{
  width: 100%;
  filter: brightness(.5);
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
  margin-top: 30%;
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
/* #field1 > div > div{
  margin: 0.2rem 0;
} */
#field2 i.icon.ion-ios-paper{
  top: -1.5rem; 
}
div.homeContent {
  background-color: inherit;
}
#index > div.main.flow-text > div.content.center-align.white-text {
    /* background-color: rgba(33, 150, 243, .25); */
    min-width: 100%;
    min-height: auto;
    /* -webkit-filter: brightness(.3); */
    /* filter: brightness(.3); */
    width: auto;
    height: 776px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform 0.6s, opacity 0.6s;
    -webkit-transition: opacity 0.6s, -webkit-transform 0.6s;
    transition: opacity 0.6s, -webkit-transform 0.6s;
    transition: transform 0.6s, opacity 0.6s;
    transition: transform 0.6s, opacity 0.6s, -webkit-transform 0.6s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}
</style>