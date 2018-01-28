<template>
  <div class="pharmacy">
    <div class="searchForm">
      <div class="row">
        <div class="col s12">
          <div class="row ">
            <form action="" class="search-drug" @submit.prevent="validateForm" @submit="findDrugs()">
              <div class="input-field col s12">
                <i class="icon ion-search x15"></i>
                <input type="search" id="autocomplete-input" class="autocomplete" placeholder="Search through available drugs" v-model="searchPharmacy"/>
              </div>
              <small class="searchErr red-text text-center">{{searchErr}}</small>
            </form>
            
          </div>
          <div class="pharmacy-search-result">
            <!-- <h1>Alright testing</h1> -->
            <div class="show-content">
              <div class="text-center center-align" v-if="!registeredDrug">
              <h5>You have not added any drug!</h5> 
              </div>
            <div class="blue-grey white-text eachDrug" v-for="allDrug in allDrugs" :key="allDrug._id" v-else>
              <ul class="collapsible" data-collapsible="accordion">
                <li>
                  <div class="collapsible-header blue-text">
                    <h5 class="left">{{allDrug.drugName}}</h5>
                    <h5 class="right grey darken-3">
                      <a class="right btn waves-effect waves-light" >
                        Price: {{allDrug.price}}
                      </a>
                    </h5>
                  </div>
                  <div class="collapsible-body">
                    <h6>Description: </h6>
                    <span>{{allDrug.briefDescription}}</span><br/><br/>
                    <h6>Manufacturer:</h6> <small class="grey lighten-4 blue-text">{{allDrug.manufac}}</small>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GetServices from '@/services/getServices'
import SearchServices from '@/services/searchServices'
export default {
  name: 'Pharmacy-section',
  data () {
    return {
      allDrugs: null,
      registeredDrug: false,
      searchPharmacy: '',
      searchErr: ''
    }
  },
  async mounted () {
    const allDrugs = (await GetServices.getAllDrugs()).data
    this.allDrugs = allDrugs
    if (this.allDrugs !== null) {
      this.registeredDrug = true
    } else {
      this.registeredDrug = false
    }
    console.log(allDrugs)
  },
  methods: {
    validateForm (e) {},
    async findDrugs () {
      let validateSearchInput = {}
      if (this.searchPharmacy !== '' && this.searchPharmacy !== null && isNaN(this.searchPharmacy)) {
        validateSearchInput.searchPharmacy = this.searchPharmacy.toLowerCase()
      } else {
        this.searchErr = 'Please enter a valid drug name!'
        return false
      }
      // console.log(validateSearchInput)
      try {
        const pharmacy = (await SearchServices.findDrugs({query: validateSearchInput.searchPharmacy})).data
        console.log('pharmacy: ', pharmacy)
        this.allDrugs = pharmacy
      } catch (error) {
        if (error) {
          console.log(JSON.stringify(error.pharmacy, null, 3))
        }
      }
    }
  }
}
</script>
<style>

#pharmacy > div > div > div > div > div.pharmacy-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > a{
  height: 36px;
  width: 9rem;
  line-height: 36px;
  padding: 0px 0.5rem;
}
#pharmacy > div > div > div > div > div.pharmacy-search-result > div > div > ul > li > div.collapsible-body > small{
  padding: 0.3rem;
  font-size: 1rem !important;
}
#pharmacy > div > div > div > div > div.pharmacy-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > span {
  margin-left: auto;
  padding: 0.3rem 0.2rem;
}
#pharmacy > div > div > div > div > div.pharmacy-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right {
  margin-left: auto
}
</style>
