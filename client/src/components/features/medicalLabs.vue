<template>
  <div class="medicallLabs" id="registeredLabs">
    <div class="searchForm">
      <div class="row">
        <div class="col s12">
          <div class="row ">
            <form action="" class="search-drug" @submit.prevent="validateForm">
              <div class="input-field col s12">
                <i class="icon ion-search x15"></i>
                <input type="search" id="autocomplete-input" class="autocomplete" placeholder="Search through registered laboratory centres" v-model="searchLab"/>
              </div>
              <small class="searchErr red-text text-center" v-html="searchErr"></small>
            </form>
            
          </div>
          <div class="lab-search-result">
            <div class="show-content">
              <div class="text-center center-align" v-if="!registeredLab">
              <h5>
                No registered laboratories yet!<br/>
              </h5> 
              </div>
            <div class="blue-grey white-text eachLab" v-for="(allLab, index) in allLabs" :key="allLab._id" :id="index" v-else>
              <ul >
                <li>
                  <div class="collapsible-header blue-text" v-if="allLab.laboratoryName">
                    <h5 class="left" @click="toViewLab(allLab._id)" :id="index">
                      {{allLab.laboratoryName}}
                    </h5>
                  
                      <a class="btn waves-effect waves-light x1 right blue" style="font-size: 0.6rem;padding: 0 0.5rem;margin-left: 18%;margin-top: 1rem;margin-bottom: 1rem;">
                       Book Appointment
                      </a>
                  
                  </div>
                </li>
              </ul>
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
import GetServices from '@/services/getServices'
import SearchServices from '@/services/searchServices'
export default {
  data () {
    return {
      allLabs: null,
      registeredLab: true,
      searchLab: '',
      searchErr: ''
    }
  },
  async mounted () {
    try {
      const allLabs = (await GetServices.getAllLabs()).data
      if (allLabs.length > 0) {
        this.registeredLab = true
        this.allLabs = allLabs
        console.log({allLabs: this.allLabs})
      } else {
        this.registeredLab = false
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    validateForm (e) {},
    async findLabs () {
      let validateSearchInput = {}
      if (this.searchLab !== '' && this.searchLab !== null && isNaN(this.searchLab)) {
        validateSearchInput.query = this.searchLab.toLowerCase()
      }
      try {
        const lab = (await SearchServices.findLabs(validateSearchInput)).data
        if (lab.length > 0) {
          this.searchLab = ''
          this.searchErr = ''
          this.allLabs = lab
        } else {
          this.allLabs = null
          this.searchErr = 'Laboratory not found.\nThe medical laboratory center you are looking for has not been registered yet!'
        }
      } catch (error) {
        console.log(error)
      }
    },
    toViewLab (labId) {
      this.allLabs.forEach(lab => {
        if (lab._id === labId) {
          this.$store.commit('SET_CURRENTLAB', {currentLab: lab})
          this.$router.push(`/${encodeURI('medical laboratory')}/user/view-${Math.floor(Math.random() * 951732548)}`)
        }
      })
    }
  }
}
</script>

<style>
  #medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > a{
  height: 36px;
  width: 9rem;
  line-height: 36px;
  padding: 0px 0.5rem;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-body > small{
  padding: 0.3rem;
  font-size: 1rem !important;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > span {
  margin-left: auto;
  padding: 0.3rem 0.2rem;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right {
  margin-left: auto
}

</style>
