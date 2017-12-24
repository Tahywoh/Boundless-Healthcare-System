import Vue from 'vue'
import Router from 'vue-router'
import Routes from '@/platform/router.js'

Vue.use(Router)

const router = new Router({routes: Routes, mode: 'history'})
let updateStore = (key, value) => {
  let storeData = {}
  if (window.localStorage.getItem('BHS-default')) {
    storeData = JSON.parse(JSON.parse(window.localStorage.getItem('BHS-default')).value)
  }
  storeData[key] = value
  localStorage.setItem('BHS-default', JSON.stringify({value: JSON.stringify(storeData)}))
}

// we now fetch data from store based on the key supplied
let fetchStoreData = key => {
  if (window.localStorage.getItem('BHS-default') && window.localStorage.getItem('BHS-default') !== null) {
    return JSON.parse(JSON.parse(window.localStorage.getItem('BHS-default')).value)[key]
  } else {
    return null
  }
}

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  window.document.title = to.name
  let userType = fetchStoreData('userType')
  let token = fetchStoreData('token')
  // console.log(token)
  if (to.meta.requiresAuth) {
    if (!token) {
      updateStore('lastPageVisited', to.path)
      next('/login')
      console.log('No token')
    } else {
      if (to.meta.patientAuth) {
        if (userType === 'Patient') {
          next()
        } else {
          console.log('patient auth required')
          updateStore('lastPageVisited', to.path)
          next('/login')
        }
      } else if (to.meta.doctorAuth) {
        if (userType === 'Doctor') {
          next()
        } else {
          updateStore('lastPageVisited', to.path)
          next('/login')
        }
      } else if (to.meta.pharmacistAuth) {
        if (userType === 'Pharmacist') {
          next()
        } else {
          updateStore('lastPageVisited', to.path)
          next('/login')
        }
      } else if (to.meta.medicalLabScientistAuth) {
        if (userType === 'MedicalLabScientist') {
          next()
        } else {
          updateStore('lastPageVisited', to.path)
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    if ((to.path === '/login' && token) || (to.path === '/register/patient' && token) || (to.path === '/register/doctor' && token) || (to.path === '/register/pharmacist' && token) || (to.path === '/register/medlabscientist' && token)) {
      if (fetchStoreData('lastPageVisited')) {
        next(fetchStoreData('lastPageVisited'))
      } else if (fetchStoreData('lastPageVisited')) {
        next(fetchStoreData('lastPageVisited'))
      } else {
        next(`/${fetchStoreData('userType')}-dashboard`)
      }
    } else {
      next()
    }
  }
})
export default router
