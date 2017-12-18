import Index from '@/platform/index'
import ErrPage from '@/components/layouts/errPage'
import RegisterPatient from '@/platform/access/registerPatient'
import RegisterDoctor from '@/platform/access/registerDoctor'
import RegisterPharmacist from '@/platform/access/registerPharmacist'
import RegisterMedlabScientist from '@/platform/access/registerMedlabScientist'
import Signin from '@/platform/access/signin'

import activeModules from '@/platform/activeModules'

let routes = [
  {
    path: '/',
    name: 'BHCS || Home',
    component: Index
  },
  {
    path: '/register-patient',
    name: 'BHCS || Register Patient',
    component: RegisterPatient
  },
  {
    path: '/register-doctor',
    name: 'BHCS || Register Doctor',
    component: RegisterDoctor
  },
  {
    path: '/register-pharmacist',
    name: 'BHCS || Register Pharmacist',
    component: RegisterPharmacist
  },
  {
    path: '/register-medlabscientist',
    name: 'BHCS || Register Medlab scientist',
    component: RegisterMedlabScientist
  },
  {
    path: '/login',
    name: 'BHCS || login',
    component: Signin
  },
  {
    path: '*',
    name: 'Error404',
    component: ErrPage
  }
]

activeModules.forEach(modul => {
  try {
    // get module routes
    let moduleRoutes = require('@/platform/' + modul + '/router').default
    // add the routes gotten to the route array
    routes = routes.concat(moduleRoutes)
    // console.log(routes)
  } catch (e) {
    console.log(e)
  }
})

export default routes
