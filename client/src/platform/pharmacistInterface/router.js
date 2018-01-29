// import components for pharmacist interface

import navs from './navs'
import Index from './index'
import Profile from './profile'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      pharmacistAuth: true
    }
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.url,
    component: Profile,
    meta: {
      requiresAuth: true,
      pharmacist: true
    }
  }
]
