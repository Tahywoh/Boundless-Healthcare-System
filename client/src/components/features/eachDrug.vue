<template>
  <div id="eDrug">
    <fixednav/>
    <div class="row">
      <div class="col s6">{{eachDrug.drugName}}</div>
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
              <p>{{eachDrug.briefDescription}}</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
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
    // this.eachDrug.forEach((drug) => {
    // })
  },
  methods: {}
}
</script>

<style>

</style>
