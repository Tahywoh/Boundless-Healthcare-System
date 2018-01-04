import Index from '@/platform/index'
import ErrPage from '@/components/layouts/errPage'
import RegisterPatient from '@/platform/access/registerPatient'
import RegisterDoctor from '@/platform/access/registerDoctor'
import RegisterPharmacist from '@/platform/access/registerPharmacist'
import RegisterMedlabScientist from '@/platform/access/registerMedlabScientist'
import Signin from '@/platform/access/signin'
import Photo from '@/components/utils/photo'
import activeModules from '@/platform/activeModules'

let routes = [
  {
    path: '/',
    name: 'BHS || Home',
    component: Index
  },
  {
    path: '/register/patient',
    name: 'BHS || Register Patient',
    component: RegisterPatient
  },
  {
    path: '/register/doctor',
    name: 'BHS || Register Doctor',
    component: RegisterDoctor
  },
  {
    path: '/register/pharmacist',
    name: 'BHS || Register Pharmacist',
    component: RegisterPharmacist
  },
  {
    path: '/register/medlabscientist',
    name: 'BHS || Register Medlab scientist',
    component: RegisterMedlabScientist
  },
  {
    path: '/login',
    name: 'BHS || login',
    component: Signin
  },
  {
    path: '/photo',
    name: 'photo',
    component: Photo
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
