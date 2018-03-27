import Index from '@/platform/index'
import ErrPage from '@/components/layouts/errPage'
import RegisterPatient from '@/platform/access/registerPatient'
import RegisterDoctor from '@/platform/access/registerDoctor'
import RegisterPharmacist from '@/platform/access/registerPharmacist'
import RegisterMedlabScientist from '@/platform/access/registerMedlabScientist'
import Signin from '@/platform/access/signin'
import Photo from '@/components/utils/photo'
import Newphoto from '@/components/utils/newphoto'
import Testphoto from '@/components/utils/testphoto'
import activeModules from '@/platform/activeModules'
import Tabs from '@/components/utils/vuetabs'

let routes = [
  {
    path: '/',
    name: 'BHS || Home',
    component: Index
  },
  {
    path: '/vue-tab',
    name: 'BHS || testing tabs',
    component: Tabs
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
    path: '/testphoto',
    name: 'Testing-photo',
    component: Testphoto
  },
  {
    path: '/newphoto',
    name: 'test photo upload',
    component: Newphoto
  },
  {
    path: '*',
    name: 'Error 404',
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
