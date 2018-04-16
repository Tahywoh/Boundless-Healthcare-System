<template>
  <div class="footer-pmgc" style="margin-left: 0%;">
    <footer class="page-footer grey darken-4">
      <div class="center-align">
        <div class="row">
          <div class="col m4">
            <h5 class="white-text animated bounceInDown">Have any questions?</h5>
            <p class="grey-text text-lighten-4 left animated bonceInRight" style="text-align: left;">We reply all questions within
            </p>
            <h2 class="blue-text col s5 animated bounceInLeft">48 h<br/>
              <span class="text-center center-align">...</span>
            </h2>
            <p class="left animated bounce" style="text-align: left;"><i class="icon ion-ios-email x2" style="font-style: normal;">&nbsp;</i> Email:&nbsp;info@b-healthcaresystem.com<wbr/></p>
          </div>
          <div class="mission col m4">
            <h4>
              Our Vision
            </h4>
            <p class="left animated bounceIn" style="text-align: left;">
              To improve the healthcare situation in the country and and make consultation easier for individuals.
              To provide access to good health care services via a virtual system.
            </p>
          </div>
          <div class="col m4">
            <h4 class="white-text animated zoomIn">Links</h4>
              <ul class="animated slideInRight">
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    <i class="icon ion-social-facebook x2"></i>
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    <i class="icon ion-social-googleplus x2"></i>
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    <i class="icon ion-social-twitter x2"></i>
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    <i class="icon ion-social-instagram x2"></i>
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    <i class="icon ion-social-linkedin x2"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright white black-text">
          <div class="container">
          &copy; <span class="footer-year">{{currentYear}}</span> Copyright All rights reserved
            <a class="blue-grey-text text-darken-2 transparent right waves-effect" href="mailto: taiwo.a.tech@gmail.com">Developed by Taiwo Adeshina</a>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentYear: ''
    }
  },
  mounted () {
    this.currentYear = new Date().getFullYear()
  }
}
</script>

<style>
</style>
