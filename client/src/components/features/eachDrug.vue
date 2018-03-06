<template>
  <div id="eDrug">
    <fixednav/>
    <div class="row">
      <div class="row">
        <div class="col s8 m7">
           <button class="btn blue white-text x15">{{eachDrug.drugName}}</button>
          <div class="card">
            <div class="card-content">
              <h5>{{eachDrug.briefDescription}}</h5>
            </div>
            <div class="card-action">
              <h6><button class="blue btn seller">Seller: </button>&nbsp;<strong class="x15">{{eachDrug.seller}}</strong></h6>
            </div>
            <div class="additionalDetail card-action">
              <h6><button class="price btn blue">Price:</button>&nbsp;
              <strong class="x15">{{eachDrug.price}}</strong>
              </h6>
              <h6><button class="currency btn blue">Currency: </button>&nbsp;&nbsp;<i class="icon ion-pound x15"></i></h6>
              <h6><button class="btn blue waves-effect waves-light">Add to cart</button></h6>
            </div>
          </div>
        </div>
        <div class="recent-drugs col s4 m5">
          <a><h5>Recently ordered drugs</h5></a>
          
          <div class="card-panel blue">
            <button class="btn grey">Paracetamol</button>
            <p>
              <span class="white-text">
              This is an antiseptic majorly used for Headache
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Septrine</button>
            <p>
              <span class="white-text">
              This is a pain reliever especially for headache and stomache. It is also used when one is too tired.
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Cough mix</button>
            <p>
              <span class="white-text">
              This is especially used for someone who is coughing. It helps heals cough completely
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Tetracychlin</button>
            <p>
              <span class="white-text">
              This is an antiseptic majorly used for Headache
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Aspirin</button>
            <p>
              <span class="white-text">
              This is an antiseptic majorly used for Headache
            </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import GetServices from '@/services/getServices'
export default {
  components: {Fixednav},
  data () {
    return {
      eachDrug: null
    }
  },
  async mounted () {
    const eachDrug = (await GetServices.getAllDrugs()).data
    this.eachDrug = eachDrug
    console.log(eachDrug)
    this.eachDrug.forEach((drug) => {
      let loc = window.location.href.split('/')
      if (drug._id === loc[5]) {
        this.eachDrug = drug
      }
    })
  },
  methods: {}
}
</script>

<style>
#eDrug > div.row > div{
  padding-top: 2rem;
}
#eDrug > div.row > div > div > div > div.card-content > h5{
  text-align: left !important;
}
#eDrug > div.row > div > div.iexist.col.s12.m5 > a {
    background-color: #bd4810;
}
</style>
