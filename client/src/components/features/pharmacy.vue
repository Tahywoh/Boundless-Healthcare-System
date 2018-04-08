 <template>
  <div class="pharmacy">
    <div class="searchForm">
      <div class="row">
        <div class="col s12">
          <div class="row ">
            <form action="" class="search-drug" @submit.prevent="validateForm" @submit="findDrugs()">
              <div class="input-field col s12">
                <i class="icon ion-search x15" @click="findDrugs"></i>
                <input type="search" id="autocomplete-input" class="autocompleteSearch" placeholder="Search through available drugs" v-model="searchPharmacy"/>
              </div>
              <small class="searchErr red-text text-center" v-html="searchErr"></small>
            </form>
            
          </div>
          <div class="pharmacy-search-result">
            <!-- <h1>Alright testing</h1> -->
            <div class="show-content">
              <div class="text-center center-align" v-if="!registeredDrug">
              <h5>
                No drug in the pharmacy yet!<br/>
                Kindly click on add drug at your left hand side to add one.
              </h5> 
              </div>
            <div class=" white blue-text eachDrug" v-for="(allDrug, index) in allDrugs" :key="allDrug._id" :id="index" v-else>
              <ul >
                <li>
                  <div class="collapsible-header blue-text" v-if="allDrug.drugName && allDrug.price">
                    <h5 class="left" @click="toDrugDescrip(allDrug._id)" :id="index">
                      {{allDrug.drugName}}
                    </h5>
                    <h5 class="right grey darken-3">
                      <a class="right btn waves-effect waves-light">
                        Price: {{allDrug.price}}
                      </a>
                    </h5>
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
import M from 'materialize-css'
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
    try {
      const allDrugs = (await GetServices.getAllDrugs()).data
      this.allDrugs = allDrugs
      if (this.allDrugs !== null) {
        this.registeredDrug = true
      } else {
        this.registeredDrug = false
      }
    } catch (error) {
      console.log(error)
      this.searchErr = error.response.data
    }
    let searchOptions = {}
    this.allDrugs.forEach(drug => {
      searchOptions[`${drug.drugName}`] = null
    })
    var elem = document.querySelector('.autocompleteSearch#autocomplete-input')
    // eslint-disable-next-line
    var instance = new M.Autocomplete(elem, {
      data: searchOptions,
      limit: 20,
      minLength: 1
    })
  },
  methods: {
    validateForm (e) {},
    async findDrugs () {
      let validateSearchInput = {}
      if (this.searchPharmacy !== '' && this.searchPharmacy !== null && isNaN(this.searchPharmacy)) {
        validateSearchInput.searchPharmacy = this.searchPharmacy.toLowerCase()
      } else {
        this.searchErr = 'Please enter a valid input.'
        return
      }
      try {
        const pharmacy = (await SearchServices.findDrugs({query: validateSearchInput.searchPharmacy})).data
        if (pharmacy.length > 0) {
          this.searchPharmacy = ''
          this.searchErr = ''
          this.allDrugs = pharmacy
        } else {
          this.allDrugs = null
          if (this.$store.state.userType === 'Pharmacist') {
            this.searchErr = 'Drug not found, you can add the drug to pharmacy by clicking on add drug button at your left hand side.'
          } else {
            this.searchErr = 'Drug not found! Please try searching with minimal words or strings'
            return
          }
        }
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    },
    toDrugDescrip (drugId) {
      this.allDrugs.forEach((drug) => {
        if (drug._id === drugId) {
          // this.$store.state.currentDrug = drug
          this.$store.commit('SET_CURRENTDRUG', {currentDrug: drug})
          this.$router.push(`/pharmacy/drug-description/current-drug-${Math.floor(Math.random() * 951732548)}`)
        }
      })
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
