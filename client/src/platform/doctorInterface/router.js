// import components for doctor interface

import navs from './navs'
import Index from './index'
import Profile from './profile.vue'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.text,
    component: Profile,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  }
]
